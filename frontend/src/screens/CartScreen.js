import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  addCartItemStartAsync,
  removeCartItemAsync,
} from "../redux/cart/cart.actions";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {
  selectCartItems,
  selectIsCartItemFetchning,
  selectCartItemError,
} from "../redux/cart/cart.selector";
import Loader from "../components/Loader";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
const CartScreen = ({
  match,
  location,
  addCartItem,
  cartItems,
  removeCartItemAsync,
  history,
  loading,
  error,
}) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  useEffect(() => {
    productId && addCartItem(productId, qty);
  }, [addCartItem, productId, qty]);

  const removeFromCartHandler = (id) => {
    removeCartItemAsync(id);
  };
  const checkOutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  return (
    <Row>
      <Col md={8} className="product-page-section">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is Empty <Link to="/">Go Back</Link>
          </Message>
        ) : loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error} Please <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((cartitem) => (
              <ListGroup.Item key={cartitem.pid}>
                <Row>
                  <Col md={2} className="product-page-section">
                    <Image
                      src={cartitem.image}
                      alt={cartitem.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3} className="product-page-section">
                    <Link to={`/product/${cartitem.pid}`}>{cartitem.name}</Link>
                  </Col>
                  <Col md={2} className="product-page-section">
                    ${cartitem.price}
                  </Col>
                  <Col md={2} className="product-page-section">
                    <Form.Control
                      as="select"
                      value={cartitem.qty}
                      onChange={(e) =>
                        addCartItem(cartitem.pid, Number(e.target.value))
                      }
                    >
                      {[...Array(cartitem.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2} className="product-page-section">
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(cartitem.pid)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4} className="product-page-section">
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((acc, curritem) => acc + curritem.qty, 0)})
              </h2>
              $
              {cartItems
                .reduce((acc, currItm) => acc + currItm.qty * currItm.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

const mapStatetoProps = createStructuredSelector({
  cartItems: selectCartItems,
  loading: selectIsCartItemFetchning,
  error: selectCartItemError,
});

const mapDispatchToProps = (dispatch) => ({
  addCartItem: (pid, qty) => {
    dispatch(addCartItemStartAsync(pid, qty));
  },
  removeCartItemAsync: (pid) => {
    dispatch(removeCartItemAsync(pid));
  },
});
export default connect(mapStatetoProps, mapDispatchToProps)(CartScreen);
