import { createSelector } from "reselect";

export const selectOrder = (state) => state.order;

export const selectCreatedOrder = createSelector(
  [selectOrder],
  (order) => order.order
);

export const selectIsCreateOrderFetchning = createSelector(
  [selectOrder],
  (order) => order.isFetching
);

export const selectCreateOrderError = createSelector(
  [selectOrder],
  (order) => order.errorMessage
);

export const selectCreateOrderSuccess = createSelector(
  [selectOrder],
  (order) => order.success
);

export const selectOrderDetails = (state) => state.orderDetails;

export const selectOrderDetailsInfo = createSelector(
  [selectOrderDetails],
  (order) => order.orderDetails
);

export const selectIsOrderDetailsFetchning = createSelector(
  [selectOrderDetails],
  (order) => order.isFetching
);

export const selectOrderDetailsError = createSelector(
  [selectOrderDetails],
  (order) => order.errorMessage
);

//order pay
export const selectOrderPay = (state) => state.orderPay;

export const selectOrderPaySuccess = createSelector(
  [selectOrderPay],
  (orderpay) => orderpay.success
);

export const selectIsOrderPayFetchning = createSelector(
  [selectOrderPay],
  (orderpay) => orderpay.isFetching
);

export const selectOrderPayError = createSelector(
  [selectOrderPay],
  (orderpay) => orderpay.errorMessage
);

//myOrders Selector
export const selectMyOrders = (state) => state.myOrders;

export const selectMyOrderDetails = createSelector(
  [selectMyOrders],
  (myOrders) => myOrders.orders
);

export const selectIsMyOrderFetchning = createSelector(
  [selectMyOrders],
  (myOrders) => myOrders.isFetching
);

export const selectMyOrderError = createSelector(
  [selectMyOrders],
  (myOrders) => myOrders.errorMessage
);

//orders --admin

export const selectOrders = (state) => state.orderList;

export const selectListOrders = createSelector(
  [selectOrders],
  (Orders) => Orders.orders
);

export const selectOrdersFetchning = createSelector(
  [selectOrders],
  (Orders) => Orders.isFetching
);

export const selectOrdersError = createSelector(
  [selectOrders],
  (Orders) => Orders.errorMessage
);

//orderDeliver selector admin
export const selectOrderDeliver = (state) => state.orderDeliver;

export const selectOrderDeliverSuccess = createSelector(
  [selectOrderDeliver],
  (orderdeliver) => orderdeliver.success
);

export const selectIsOrderDeliverFetchning = createSelector(
  [selectOrderDeliver],
  (orderdeliver) => orderdeliver.isFetching
);

export const selectOrderDeliverError = createSelector(
  [selectOrderDeliver],
  (orderdeliver) => orderdeliver.errorMessage
);
