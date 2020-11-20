import productActionTypes from "./product.actionTypes";
const INITIAL_STATE = {
  products: [],
  isFetching: false,
  errorMessage: null,
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productActionTypes.FETCH_PRODUCT_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case productActionTypes.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case productActionTypes.FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;

const INITIAL_STATE_TOP_PRODUCT = {
  products: [],
  isFetching: false,
  errorMessage: null,
};

export const topProductReducer = (
  state = INITIAL_STATE_TOP_PRODUCT,
  action
) => {
  switch (action.type) {
    case productActionTypes.FETCH_TOP_PRODUCT_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case productActionTypes.FETCH_TOP_PRODUCT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        products: action.payload,
        errorMessage: null,
      };
    case productActionTypes.FETCH_TOP_PRODUCT_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
        products: null,
      };
    default:
      return state;
  }
};
