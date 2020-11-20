import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row, ListGroup, Image, Card } from "react-bootstrap";
import { createOrderStartAsync } from "../redux/order/order.actions";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { connect } from "react-redux";
import {
  selectCartItemsPrice,
  selectCart,
  selectCartShippingPrice,
  selectCartTaxPrice,
  selectCartTotalPrice,
} from "../redux/cart/cart.selector";
import { createStructuredSelector } from "reselect";
import {
  selectCreatedOrder,
  selectIsCreateOrderFetchning,
  selectCreateOrderError,
  selectCreateOrderSuccess,
} from "../redux/order/order.selector";

//component
const PlaceOrderScreen = ({
  history,
  itemsPrice,
  cart,
  shippingPrice,
  taxPrice,
  totalPrice,
  createOrder,
  createdOrder,
  errorCreateOrder,
  successCreateOrder,
  loadingCreateOrder,
}) => {
  const {
    cartItems,
    paymentMethod,
    shippingAddress: { city, country, postalCode, address },
  } = cart;

  //Lifecycle
  useEffect(() => {
    if (successCreateOrder) {
      history.push(`/order/${createdOrder._id}`);
    }
    // eslint-disable-next-line
  }, [successCreateOrder, history]);
  const placeOrderHandler = () => {
    createOrder({
      orderItems: cartItems,
      shippingAddress: { city, country, postalCode, address },
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {address} ,{city} ,{postalCode} ,{country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method:</strong>
              {paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item) => (
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
              <ListGroup.Item>
                {errorCreateOrder && (
                  <Message variant="danger">{errorCreateOrder}</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  itemsPrice: selectCartItemsPrice,
  cart: selectCart,
  shippingPrice: selectCartShippingPrice,
  taxPrice: selectCartTaxPrice,
  totalPrice: selectCartTotalPrice,
  createdOrder: selectCreatedOrder,
  errorCreateOrder: selectCreateOrderError,
  loadingCreateOrder: selectIsCreateOrderFetchning,
  successCreateOrder: selectCreateOrderSuccess,
});
const mapDispatchToProps = (dispatch) => ({
  createOrder: (orderData) => dispatch(createOrderStartAsync(orderData)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrderScreen);
