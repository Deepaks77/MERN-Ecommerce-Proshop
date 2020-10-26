import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchProductDetailStartAsync } from "../redux/productDetail/productDetails.actions";
import {
  selectProductDetailItems,
  selectIsProductDetailFetching,
  selectProductDetailError,
} from "../redux/productDetail/productDetails.selector";
import Loader from "../components/Loader";
import Message from "../components/Message";

//component
const ProductScreen = ({
  product,
  match,
  fetchProductDetailStartAsync,
  error,
  loading,
  history,
}) => {
  const requestedProductId = match.params.id;
  const [qty, setQty] = useState(1);
  useEffect(() => {
    fetchProductDetailStartAsync(requestedProductId);
  }, [fetchProductDetailStartAsync, requestedProductId]);
  // const generateArrayFromNumber = () => {
  //   let finalarray = [];
  //   for (let i = 0; i < 5; i++) {
  //     finalarray.push(i);
  //   }
  //   return finalarray;
  // };

  const addToCartHandler = () => {
    history.push(`/cart/${requestedProductId}?qty=${qty}`);
  };
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6} className="product-page-section">
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3} className="product-page-section">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: ${product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3} className="product-page-section">
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col className="product-page-section">Price:</Col>
                    <Col className="product-page-section">
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col className="product-page-section">Status:</Col>
                    <Col className="product-page-section">
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col className="product-page-section">Qty</Col>
                      <Col className="product-page-section">
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {/* to make array from a number brad has use following thing but
                         i have written my own function above commented , you can see */}
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};
const mapStatetoProps = createStructuredSelector({
  product: selectProductDetailItems,
  loading: selectIsProductDetailFetching,
  error: selectProductDetailError,
});
const mapDispatchToProps = (dispatch) => ({
  fetchProductDetailStartAsync: (productId) =>
    dispatch(fetchProductDetailStartAsync(productId)),
});
export default connect(mapStatetoProps, mapDispatchToProps)(ProductScreen);
