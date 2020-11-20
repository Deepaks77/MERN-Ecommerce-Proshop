import React, { useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { fetchProductsStartAsync } from "../redux/product/product.actions";
import { createStructuredSelector } from "reselect";
import { selectUserInfo } from "../redux/user/user.selector";
import { userDeleteStartAsync } from "../redux/user/user.actions";
import Paginate from "../components/Paginate";
import {
  selectProductItems,
  selectIsProductFetchning,
  selectProductError,
  selectProductNumberOfPages,
  selectProductCurrentPage,
} from "../redux/product/product.selector";
import {
  selectProductDeleteSuccess,
  selectIsProductDeleteFetching,
  selectProductDeleteError,
  selectCreateProductSuccess,
  selectIsCreateProductFetching,
  selectCreateProductError,
  selectCreatedProduct,
} from "../redux/productDetail/productDetails.selector";
import {
  deleteProductStartAsync,
  createProductReset,
  createProductStartAsync,
} from "../redux/productDetail/productDetails.actions";
//component
const ProductListScreen = ({
  userInfo,
  history,
  match,
  listProducts,
  pages,
  page,
  products,
  loading,
  error,
  deleteProduct,
  errorDelete,
  successDelete,
  loadingDelete,
  productCreateReset,
  successCreate,
  createProduct,
  createdProduct,
  errorCreate,
  loadingCreate,
}) => {
  const pageNumber = match.params.pageNumber || 1;
  useEffect(() => {
    productCreateReset();
    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      listProducts("", pageNumber);
    }
    // eslint-disable-next-line
  }, [
    history,
    userInfo,
    listProducts,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);
  const deleteHandler = (productId) => {
    if (window.confirm("Are you sure")) {
      deleteProduct(productId);
    }
  };

  const createProductHandler = () => {
    createProduct();
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>EDIT/REMOVE</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>

                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i
                          className="fas fa-pen fa-1.5x"
                          title="Edit Product"
                        ></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i
                        className="fas fa-trash fa-1.5x"
                        title="Delete Product"
                      ></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin />
        </>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  products: selectProductItems,
  loading: selectIsProductFetchning,
  error: selectProductError,
  userInfo: selectUserInfo,
  successDelete: selectProductDeleteSuccess,
  loadingDelete: selectIsProductDeleteFetching,
  errorDelete: selectProductDeleteError,
  successCreate: selectCreateProductSuccess,
  loadingCreate: selectIsCreateProductFetching,
  errorCreate: selectCreateProductError,
  createdProduct: selectCreatedProduct,
  page: selectProductCurrentPage,
  pages: selectProductNumberOfPages,
});
const mapDispatchToProps = (dispatch) => ({
  deleteUser: (userId) => dispatch(userDeleteStartAsync(userId)),
  listProducts: (keyword, pageNumber) =>
    dispatch(fetchProductsStartAsync(keyword, pageNumber)),
  deleteProduct: (productId) => dispatch(deleteProductStartAsync(productId)),
  createProduct: () => dispatch(createProductStartAsync()),
  productCreateReset: () => dispatch(createProductReset()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductListScreen);
