import orderActionTypes from "./order.actionTypes";

const INITIAL_STATE_CREATE_ORDER = {
  order: [],
  success: false,
  isFetching: false,
  errorMessage: null,
};

export const orderReducer = (state = INITIAL_STATE_CREATE_ORDER, action) => {
  switch (action.type) {
    case orderActionTypes.ORDER_CREATE_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case orderActionTypes.ORDER_CREATE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        success: true,
        order: action.payload,
      };
    }
    case orderActionTypes.ORDER_CREATE_FAILURE: {
      return {
        ...state,
        isFetching: false,
        success: false,
        errorMessage: action.payload,
      };
    }
    default:
      return state;
  }
};

//orderDetail Reducer
const INITIAL_STATE_ORDER_DETAILS = {
  orderDetails: { shippingAddress: {}, orderItems: [] },
  isFetching: true,
  errorMessage: null,
};
export const orderDetailsReducer = (
  state = INITIAL_STATE_ORDER_DETAILS,
  action
) => {
  switch (action.type) {
    case orderActionTypes.ORDER_DETAILS_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case orderActionTypes.ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        orderDetails: action.payload,
      };
    }
    case orderActionTypes.ORDER_DETAILS_FAILURE: {
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    }
    case orderActionTypes.ORDER_DETAILS_RESET: {
      return {
        ...INITIAL_STATE_ORDER_DETAILS,
      };
    }
    default:
      return state;
  }
};

//orderPay Reducer
const INITIAL_STATE_ORDER_PAY = {
  isFetching: false,
  success: false,
  errorMessage: null,
};
export const orderPayReducer = (state = INITIAL_STATE_ORDER_PAY, action) => {
  switch (action.type) {
    case orderActionTypes.ORDER_PAY_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case orderActionTypes.ORDER_PAY_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        success: true,
      };
    }
    case orderActionTypes.ORDER_PAY_FAILURE: {
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    }
    case orderActionTypes.ORDER_PAY_RESET: {
      return {
        ...INITIAL_STATE_ORDER_PAY,
      };
    }
    default:
      return state;
  }
};

//myOrder Reducer
const INITIAL_STATE_ORDER_MYORDERS = {
  orders: [],
  isFetching: false,
  errorMessage: null,
};
export const orderMyOrdersReducer = (
  state = INITIAL_STATE_ORDER_MYORDERS,
  action
) => {
  switch (action.type) {
    case orderActionTypes.ORDER_MYORDER_LIST_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case orderActionTypes.ORDER_MYORDER_LIST_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        orders: action.payload,
      };
    }
    case orderActionTypes.ORDER_MYORDER_LIST_FAILURE: {
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    }
    case orderActionTypes.ORDER_MYORDER_LIST_RESET: {
      return {
        ...INITIAL_STATE_ORDER_MYORDERS,
      };
    }
    default:
      return state;
  }
};

//ordersList reducer -- admin
const INITIAL_STATE_ORDERS = {
  orders: [],
  isFetching: false,
  errorMessage: null,
};
export const orderListOrdersReducer = (
  state = INITIAL_STATE_ORDERS,
  action
) => {
  switch (action.type) {
    case orderActionTypes.ORDER_LIST_START: {
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };
    }
    case orderActionTypes.ORDER_LIST_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        orders: action.payload,
      };
    }
    case orderActionTypes.ORDER_LIST_FAILURE: {
      return {
        ...state,
        isFetching: false,
        orders: [],
        errorMessage: action.payload,
      };
    }
    default:
      return state;
  }
};

//set order delivered reducer by admin

//orderDeliver Reducer
const INITIAL_STATE_ORDER_DELIVER = {
  isFetching: false,
  success: false,
  errorMessage: null,
};
export const orderDeliverReducer = (
  state = INITIAL_STATE_ORDER_DELIVER,
  action
) => {
  switch (action.type) {
    case orderActionTypes.ORDER_DELIVER_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case orderActionTypes.ORDER_DELIVER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        success: true,
      };
    }
    case orderActionTypes.ORDER_DELIVER_FAILURE: {
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    }
    case orderActionTypes.ORDER_DELIVER_RESET: {
      return {
        ...INITIAL_STATE_ORDER_DELIVER,
      };
    }
    default:
      return state;
  }
};
