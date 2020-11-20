//brad has used useDispatch and useSelector hooks for dispatching and selecting
//useSelector does not use reselect library thats why i am using old method taught by yihua zhang
//although you can look brad traversy's complete code i have forked it on github
import React, { useEffect } from "react";
//import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product.jsx";
import { fetchProductsStartAsync } from "../redux/product/product.actions";
import {
  selectProductItems,
  selectIsProductFetchning,
  selectProductError,
  selectProductNumberOfPages,
  selectProductCurrentPage,
} from "../redux/product/product.selector";
import { createStructuredSelector } from "reselect";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
const HomeScreen = ({
  error,
  loading,
  products,
  page,
  pages,
  fetchProductsStartAsync,
  match,
}) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  useEffect(() => {
    fetchProductsStartAsync(keyword, pageNumber);
  }, [fetchProductsStartAsync, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col
                className="align-items-stretch d-flex"
                key={product._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
              >
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

const mapStatetoProps = createStructuredSelector({
  products: selectProductItems,
  loading: selectIsProductFetchning,
  error: selectProductError,
  page: selectProductCurrentPage,
  pages: selectProductNumberOfPages,
});
const mapDispatchToProps = (dispatch) => ({
  fetchProductsStartAsync: (keyword, pageNumber) =>
    dispatch(fetchProductsStartAsync(keyword, pageNumber)),
});

export default connect(mapStatetoProps, mapDispatchToProps)(HomeScreen);
