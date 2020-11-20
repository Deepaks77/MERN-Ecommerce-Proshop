import productActionTypes from "./product.actionTypes";
import axios from "axios";
export const fetchProductsStart = () => ({
  type: productActionTypes.FETCH_PRODUCT_START,
});

export const fetchProductsSuccess = (products) => ({
  type: productActionTypes.FETCH_PRODUCT_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (errorMessage) => ({
  type: productActionTypes.FETCH_PRODUCT_FAILURE,
  payload: errorMessage,
});

export const fetchProductsStartAsync = (
  keyword = "",
  pageNumber = ""
) => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const { data } = await axios.get(
      `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
    );
    dispatch(fetchProductsSuccess(data));
  } catch (error) {
    dispatch(
      fetchProductsFailure(
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message
      )
    );
  }
};

//top products actions
export const fetchTopProductsStart = () => ({
  type: productActionTypes.FETCH_TOP_PRODUCT_START,
});

export const fetchTopProductsSuccess = (products) => ({
  type: productActionTypes.FETCH_TOP_PRODUCT_SUCCESS,
  payload: products,
});

export const fetchTopProductsFailure = (errorMessage) => ({
  type: productActionTypes.FETCH_TOP_PRODUCT_FAILURE,
  payload: errorMessage,
});

export const fetchTopProductsStartAsync = () => async (dispatch) => {
  dispatch(fetchTopProductsStart());
  try {
    const { data } = await axios.get(`/api/products/top`);
    dispatch(fetchTopProductsSuccess(data));
  } catch (error) {
    dispatch(
      fetchTopProductsFailure(
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message
      )
    );
  }
};
