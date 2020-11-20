import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";
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
import {
  fetchProductDetailStartAsync,
  createProductReviewReset,
  createProductReviewStartAsync,
} from "../redux/productDetail/productDetails.actions";
import {
  selectProductDetailItems,
  selectIsProductDetailFetching,
  selectProductDetailError,
  selectCreateProductReviewSuccess,
  selectCreateProductReviewError,
} from "../redux/productDetail/productDetails.selector";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { selectUserInfo } from "../redux/user/user.selector";
//component
const ProductScreen = ({
  userInfo,
  product,
  match,
  fetchProductDetailStartAsync,
  error,
  loading,
  history,
  resetProductReview,
  createProductReview,
  successProductReview,
  errorProductReview,
}) => {
  const requestedProductId = match.params.id;
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      resetProductReview();
    } else fetchProductDetailStartAsync(requestedProductId);
    // eslint-disable-next-line
  }, [fetchProductDetailStartAsync, requestedProductId, successProductReview]);
  // const generateArrayFromNumber = () => {
  //   let finalarray = [];
  //   for (let i = 0; i < 5; i++) {
  //     finalarray.push(i);
  //   }
  //   return finalarray;
  // };

  const submitHandler = (e) => {
    //submit review logic here
    e.preventDefault();
    createProductReview(requestedProductId, {
      rating,
      comment,
    });
  };
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
        <>
          <Meta title={product.name} />
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
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
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
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Execellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link>
                      to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
const mapStatetoProps = createStructuredSelector({
  product: selectProductDetailItems,
  loading: selectIsProductDetailFetching,
  error: selectProductDetailError,
  successProductReview: selectCreateProductReviewSuccess,
  errorProductReview: selectCreateProductReviewError,
  userInfo: selectUserInfo,
});
const mapDispatchToProps = (dispatch) => ({
  fetchProductDetailStartAsync: (productId) =>
    dispatch(fetchProductDetailStartAsync(productId)),
  resetProductReview: () => dispatch(createProductReviewReset()),
  createProductReview: (productId, reviewObj) =>
    dispatch(createProductReviewStartAsync(productId, reviewObj)),
});
export default connect(mapStatetoProps, mapDispatchToProps)(ProductScreen);
