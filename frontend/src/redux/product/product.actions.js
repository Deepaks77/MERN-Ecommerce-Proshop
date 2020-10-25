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

export const fetchProoductsStartAsync = () => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const { data } = await axios.get("/api/products");
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
