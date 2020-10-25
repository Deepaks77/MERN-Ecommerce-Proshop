//brad has used useDispatch and useSelector hooks for dispatching and selecting
//useSelector does not use reselect library thats why i am using old method taught by yihua zhang
//although you can look brad traversy's complete code i have forked it on github
import React, { useEffect } from "react";
//import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product.jsx";
import { fetchProoductsStartAsync } from "../redux/product/product.actions";
import {
  selectProductItems,
  selectIsProductFetchning,
  selectProductError,
} from "../redux/product/product.selector";
import { createStructuredSelector } from "reselect";
import Message from "../components/Message";
import Loader from "../components/Loader";
const HomeScreen = ({ error, loading, products, fetchProoductsStartAsync }) => {
  useEffect(() => {
    fetchProoductsStartAsync();
  }, [fetchProoductsStartAsync]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

const mapStatetoProps = createStructuredSelector({
  products: selectProductItems,
  loading: selectIsProductFetchning,
  error: selectProductError,
});
const mapDispatchToProps = (dispatch) => ({
  fetchProoductsStartAsync: () => dispatch(fetchProoductsStartAsync()),
});

export default connect(mapStatetoProps, mapDispatchToProps)(HomeScreen);
