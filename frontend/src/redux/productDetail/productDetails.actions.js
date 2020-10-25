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
