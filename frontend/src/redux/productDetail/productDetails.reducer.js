import productDetailsActionTypes from "./productDetails.actionTypes";
const INITIAL_STATE = {
  product: { reviews: [] },
  isFetching: false,
  errorMessage: null,
};

const productDetailReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productDetailsActionTypes.FETCH_PRODUCT_DETAILS_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case productDetailsActionTypes.FETCH_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        product: action.payload,
      };
    case productDetailsActionTypes.FETCH_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default productDetailReducer;
