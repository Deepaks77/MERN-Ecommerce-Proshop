import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { Col, Row, ListGroup, Image, Card, Button } from "react-bootstrap";
import { selectUserInfo } from "../redux/user/user.selector";
import {
  orderDetailsStartAsync,
  orderPayStartAsync,
  orderPayReset,
  orderDeliverReset,
  orderDeliverStartAsync,
} from "../redux/order/order.actions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectOrderDetailsInfo,
  selectIsOrderDetailsFetchning,
  selectOrderDetailsError,
  selectOrderPaySuccess,
  selectIsOrderPayFetchning,
  selectOrderPayError,
  selectOrderDeliverSuccess,
  selectIsOrderDeliverFetchning,
  selectOrderDeliverError,
} from "../redux/order/order.selector";

//component
const OrderScreen = ({
  history,
  match,
  orderDetails,
  loading,
  error,
  getOrderDetails,
  successPay,
  loadingPay,
  errorPay,
  setOrderPay,
  setOrderDeliver,
  resetPay,
  resetDeliver,
  successDeliver,
  errorDeliver,
  loadingDeliver,
  userInfo,
}) => {
  const orderId = match.params.id;
  const {
    paidAt,
    isDelivered,
    deliveredAt,
    isPaid,
    user,
    _id,
    itemsPrice,
    taxPrice,
    totalPrice,
    shippingPrice,
    orderItems,
    paymentMethod,
    shippingAddress: { city, country, postalCode, address },
  } = orderDetails;

  const [sdkReady, setSdkReady] = useState(false);

  //Lifecycle
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      console.log("Why Two Times", clientId);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if ((!_id || successPay || successDeliver || orderId !== _id) && orderId) {
      resetPay();
      resetDeliver();
      getOrderDetails(orderId);
    } else if (!isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
    // eslint-disable-next-line
  }, [orderId, _id, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    console.log("Payment Done", paymentResult);
    setOrderPay(orderId, paymentResult);
  };

  const deliverHandler = () => {
    setOrderDeliver(_id);
  };
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {orderDetails._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong>
                {user.name}
              </p>
              <p>
                {" "}
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {address} ,{city} ,{postalCode} ,{country}
              </p>
              {isDelivered ? (
                <Message variant="success">Delivered on {deliveredAt}</Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                {" "}
                <strong>Method:</strong>
                {paymentMethod}
              </p>
              {isPaid ? (
                <Message variant="success">Paid on {paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {orderItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {orderItems.map((item) => (
                    <ListGroup.Item key={item.pid}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col style={{ margin: "auto" }}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4} style={{ margin: "auto" }}>
                          {item.qty} x ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={totalPrice}
                      currency="USD"
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && isPaid && !isDelivered && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverHandler}
                  >
                    Mark as Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  userInfo: selectUserInfo,
  orderDetails: selectOrderDetailsInfo,
  error: selectOrderDetailsError,
  loading: selectIsOrderDetailsFetchning,
  successPay: selectOrderPaySuccess,
  errorPay: selectIsOrderPayFetchning,
  loadingPay: selectOrderPayError,
  successDeliver: selectOrderDeliverSuccess,
  loadingDeliver: selectIsOrderDeliverFetchning,
  errorDeliver: selectOrderDeliverError,
});
const mapDispatchToProps = (dispatch) => ({
  getOrderDetails: (orderId) => dispatch(orderDetailsStartAsync(orderId)),
  setOrderPay: (orderId, paymentResult) =>
    dispatch(orderPayStartAsync(orderId, paymentResult)),
  resetPay: () => dispatch(orderPayReset()),
  resetDeliver: () => dispatch(orderDeliverReset()),
  setOrderDeliver: (orderId) => dispatch(orderDeliverStartAsync(orderId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);
