import productDetailsActionTypes from "./productDetails.actionTypes";
import axios from "axios";
export const fetchProductDetailsStart = () => ({
  type: productDetailsActionTypes.FETCH_PRODUCT_DETAILS_START,
});

export const fetchProductDetailsSuccess = (product) => ({
  type: productDetailsActionTypes.FETCH_PRODUCT_DETAILS_SUCCESS,
  payload: product,
});

export const fetchProductDetailsFailure = (errorMessage) => ({
  type: productDetailsActionTypes.FETCH_PRODUCT_DETAILS_FAILURE,
  payload: errorMessage,
});

export const fetchProductDetailStartAsync = (productId) => async (dispatch) => {
  dispatch(fetchProductDetailsStart());
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch(fetchProductDetailsSuccess(data));
  } catch (error) {
    dispatch(
      fetchProductDetailsFailure(
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message
      )
    );
  }
};

//admin create Products
export const createProductStart = () => ({
  type: productDetailsActionTypes.CREATE_PRODUCT_START,
});

export const createProductSuccess = (createdProduct) => ({
  type: productDetailsActionTypes.CREATE_PRODUCT_SUCCESS,
  payload: createdProduct,
});

export const createProductReset = () => ({
  type: productDetailsActionTypes.CREATE_PRODUCT_RESET,
});
export const createProductFailure = (errorMessage) => ({
  type: productDetailsActionTypes.CREATE_PRODUCT_FAILURE,
  payload: errorMessage,
});

export const createProductStartAsync = () => async (dispatch, getState) => {
  dispatch(createProductStart());
  try {
    const {
      userInfo: { token },
    } = getState().user;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    //we are creating and filling data with fake data handled at backend
    const { data } = await axios.post(`/api/products/`, {}, config);
    dispatch(createProductSuccess(data));
  } catch (error) {
    dispatch(
      createProductFailure(
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message
      )
    );
  }
};

//admin update Products
export const updateProductStart = () => ({
  type: productDetailsActionTypes.UPDATE_PRODUCT_START,
});

export const updateProductSuccess = (updatedProduct) => ({
  type: productDetailsActionTypes.UPDATE_PRODUCT_SUCCESS,
  payload: updatedProduct,
});

export const updateProductReset = () => ({
  type: productDetailsActionTypes.UPDATE_PRODUCT_RESET,
});
export const updateProductFailure = (errorMessage) => ({
  type: productDetailsActionTypes.UPDATE_PRODUCT_FAILURE,
  payload: errorMessage,
});

export const updateProductStartAsync = (productDetail) => async (
  dispatch,
  getState
) => {
  dispatch(updateProductStart());
  try {
    const {
      userInfo: { token },
    } = getState().user;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `/api/products/${productDetail._id}`,
      productDetail,
      config
    );
    dispatch(updateProductSuccess(data));
  } catch (error) {
    dispatch(
      updateProductFailure(
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message
      )
    );
  }
};

//admin delete Products
export const deleteProductStart = () => ({
  type: productDetailsActionTypes.DELETE_PRODUCT_START,
});

export const deleteProductSuccess = () => ({
  type: productDetailsActionTypes.DELETE_PRODUCT_SUCCESS,
});

export const deleteProductFailure = (errorMessage) => ({
  type: productDetailsActionTypes.DELETE_PRODUCT_FAILURE,
  payload: errorMessage,
});

export const deleteProductStartAsync = (productId) => async (
  dispatch,
  getState
) => {
  dispatch(deleteProductStart());
  try {
    const {
      userInfo: { token },
    } = getState().user;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`/api/products/${productId}`, config);
    dispatch(deleteProductSuccess());
  } catch (error) {
    dispatch(
      deleteProductFailure(
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message
      )
    );
  }
};

//create product review
export const createProductReviewStart = () => ({
  type: productDetailsActionTypes.CREATE_PRODUCT_REVIEW_START,
});

export const createProductReviewSuccess = () => ({
  type: productDetailsActionTypes.CREATE_PRODUCT_REVIEW_SUCCESS,
});

export const createProductReviewFailure = (errorMessage) => ({
  type: productDetailsActionTypes.CREATE_PRODUCT_REVIEW_FAILURE,
  payload: errorMessage,
});

export const createProductReviewReset = () => ({
  type: productDetailsActionTypes.CREATE_PRODUCT_REVIEW_RESET,
});

export const createProductReviewStartAsync = (productId, reviewsObj) => async (
  dispatch,
  getState
) => {
  dispatch(createProductReviewStart());
  try {
    const {
      userInfo: { token },
    } = getState().user;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.post(`/api/products/${productId}/reviews`, reviewsObj, config);
    dispatch(createProductReviewSuccess());
  } catch (error) {
    dispatch(
      createProductReviewFailure(
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message
      )
    );
  }
};
