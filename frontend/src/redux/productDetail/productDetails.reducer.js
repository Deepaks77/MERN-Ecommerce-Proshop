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
        errorMessage: null,
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

//product create reducer by admin:
export const INITIAL_STATE_PRODUCT_CREATE = {
  products: null,
  success: false,
  isFetching: false,
  errorMessage: null,
};

export const createProductReducer = (
  state = INITIAL_STATE_PRODUCT_CREATE,
  action
) => {
  switch (action.type) {
    case productDetailsActionTypes.CREATE_PRODUCT_START: {
      return {
        ...state,
        isFetching: true,
        success: false,
        product: null,
      };
    }
    case productDetailsActionTypes.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true,
        product: action.payload,
      };
    case productDetailsActionTypes.CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
        product: null,
      };
    case productDetailsActionTypes.CREATE_PRODUCT_RESET:
      return {
        ...INITIAL_STATE_PRODUCT_CREATE,
      };
    default:
      return state;
  }
};

//product update reducer admin

export const INITIAL_STATE_PRODUCT_UPDATE = {
  products: null,
  success: false,
  isFetching: false,
  errorMessage: null,
};

export const updateProductReducer = (
  state = INITIAL_STATE_PRODUCT_UPDATE,
  action
) => {
  switch (action.type) {
    case productDetailsActionTypes.UPDATE_PRODUCT_START: {
      return {
        ...state,
        isFetching: true,
        success: false,
        product: null,
        errorMessage: null,
      };
    }
    case productDetailsActionTypes.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true,
        product: action.payload,
      };
    case productDetailsActionTypes.UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
        product: null,
      };
    case productDetailsActionTypes.UPDATE_PRODUCT_RESET:
      return {
        ...INITIAL_STATE_PRODUCT_UPDATE,
      };
    default:
      return state;
  }
};

//product delete reducer by admin:
const INITIAL_STATE_PRODUCT_DELETE = {
  isFetching: false,
  errorMessage: null,
  success: false,
};

export const productDeleteReducer = (
  state = INITIAL_STATE_PRODUCT_DELETE,
  action
) => {
  switch (action.type) {
    case productDetailsActionTypes.DELETE_PRODUCT_START: {
      return {
        ...state,
        isFetching: true,
        success: false,
      };
    }
    case productDetailsActionTypes.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true,
      };
    case productDetailsActionTypes.DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

//product create Reducer //private
const INITIAL_STATE_PRODUCT_REVIEW = {
  isFetching: false,
  errorMessage: null,
  success: false,
};

export const productCreateReviewReducer = (
  state = INITIAL_STATE_PRODUCT_REVIEW,
  action
) => {
  switch (action.type) {
    case productDetailsActionTypes.CREATE_PRODUCT_REVIEW_START: {
      return {
        ...state,
        isFetching: true,
        success: false,
      };
    }
    case productDetailsActionTypes.CREATE_PRODUCT_REVIEW_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true,
      };
    case productDetailsActionTypes.CREATE_PRODUCT_REVIEW_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case productDetailsActionTypes.CREATE_PRODUCT_REVIEW_RESET:
      return {
        ...INITIAL_STATE_PRODUCT_REVIEW,
      };
    default:
      return state;
  }
};
