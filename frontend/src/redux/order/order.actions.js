import axios from "axios";
import orderActionTypes from "./order.actionTypes";

export const createOrderStart = () => ({
  type: orderActionTypes.ORDER_CREATE_START,
});

export const createOrderSuccess = (createdOrder) => ({
  type: orderActionTypes.ORDER_CREATE_SUCCESS,
  payload: createdOrder,
});

export const createOrderFailure = (errorMessage) => ({
  type: orderActionTypes.ORDER_CREATE_FAILURE,
  payload: errorMessage,
});

export const createOrderStartAsync = (order) => async (dispatch, getState) => {
  dispatch(createOrderStart());
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
    const { data } = await axios.post(`/api/orders`, order, config);
    dispatch(createOrderSuccess(data));
  } catch (error) {
    dispatch(
      createOrderFailure(
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message
      )
    );
  }
};

export const orderDetailsStart = () => ({
  type: orderActionTypes.ORDER_DETAILS_START,
});

export const orderDetailsSuccess = (orderDetails) => ({
  type: orderActionTypes.ORDER_DETAILS_SUCCESS,
  payload: orderDetails,
});

export const orderDetailsFailure = (errorMessage) => ({
  type: orderActionTypes.ORDER_DETAILS_FAILURE,
  payload: errorMessage,
});

export const orderDetailsReset = () => ({
  type: orderActionTypes.ORDER_DETAILS_RESET,
});
export const orderDetailsStartAsync = (orderId) => async (
  dispatch,
  getState
) => {
  dispatch(orderDetailsStart());
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
    const { data } = await axios.get(`/api/orders/${orderId}`, config);
    dispatch(orderDetailsSuccess(data));
  } catch (error) {
    dispatch(
      orderDetailsFailure(
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message
      )
    );
  }
};

//orderPay actions
export const orderPayStart = () => ({
  type: orderActionTypes.ORDER_PAY_START,
});

export const orderPaySuccess = (orderDetails) => ({
  type: orderActionTypes.ORDER_PAY_SUCCESS,
  payload: orderDetails,
});

export const orderPayFailure = (errorMessage) => ({
  type: orderActionTypes.ORDER_PAY_FAILURE,
  payload: errorMessage,
});

export const orderPayReset = () => ({
  type: orderActionTypes.ORDER_PAY_RESET,
});

export const orderPayStartAsync = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch(orderPayStart());
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
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );
    dispatch(orderPaySuccess(data));
  } catch (error) {
    dispatch(
      orderPayFailure(
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message
      )
    );
  }
};

//myOrders Actions
export const orderMyOrderStart = () => ({
  type: orderActionTypes.ORDER_MYORDER_LIST_START,
});

export const orderMyOrderSuccess = (myorders) => ({
  type: orderActionTypes.ORDER_MYORDER_LIST_SUCCESS,
  payload: myorders,
});

export const orderMyOrderFailure = (errorMessage) => ({
  type: orderActionTypes.ORDER_MYORDER_LIST_FAILURE,
  payload: errorMessage,
});

export const orderMyOrderReset = () => ({
  type: orderActionTypes.ORDER_MYORDER_LIST_RESET,
});
export const orderMyOrderStartAsync = () => async (dispatch, getState) => {
  dispatch(orderMyOrderStart());
  try {
    const {
      userInfo: { token },
    } = getState().user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data: myOrders } = await axios.get(`/api/orders/myorders`, config);
    dispatch(orderMyOrderSuccess(myOrders));
  } catch (error) {
    dispatch(
      orderMyOrderFailure(
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message
      )
    );
  }
};

//orders actions
export const orderListOrderStart = () => ({
  type: orderActionTypes.ORDER_LIST_START,
});

export const orderListOrderSuccess = (orders) => ({
  type: orderActionTypes.ORDER_LIST_SUCCESS,
  payload: orders,
});

export const orderListOrderFailure = (errorMessage) => ({
  type: orderActionTypes.ORDER_LIST_FAILURE,
  payload: errorMessage,
});

export const orderListOrderStartAsync = () => async (dispatch, getState) => {
  dispatch(orderListOrderStart());
  try {
    const {
      userInfo: { token },
    } = getState().user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data: Orders } = await axios.get(`/api/orders`, config);
    dispatch(orderListOrderSuccess(Orders));
  } catch (error) {
    dispatch(
      orderListOrderFailure(
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message
      )
    );
  }
};

//orderDeliver Actions admin
//orderPay actions
export const orderDeliverStart = () => ({
  type: orderActionTypes.ORDER_DELIVER_START,
});

export const orderDeliverSuccess = (orderDetails) => ({
  type: orderActionTypes.ORDER_DELIVER_SUCCESS,
  payload: orderDetails,
});

export const orderDeliverFailure = (errorMessage) => ({
  type: orderActionTypes.ORDER_DELIVER_FAILURE,
  payload: errorMessage,
});

export const orderDeliverReset = () => ({
  type: orderActionTypes.ORDER_DELIVER_RESET,
});

export const orderDeliverStartAsync = (orderId) => async (
  dispatch,
  getState
) => {
  dispatch(orderDeliverStart());
  try {
    const {
      userInfo: { token },
    } = getState().user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `/api/orders/${orderId}/deliver`,
      {},
      config
    );
    dispatch(orderDeliverSuccess(data));
  } catch (error) {
    dispatch(
      orderDeliverFailure(
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message
      )
    );
  }
};
