import { combineReducers } from "redux";
import productReducer, { topProductReducer } from "./product/product.reducer";
import productDetailReducer, {
  productDeleteReducer,
  createProductReducer,
  updateProductReducer,
  productCreateReviewReducer,
} from "./productDetail/productDetails.reducer";
import cartReducer from "./cart/cart.reducer";
import {
  userLoginReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./user/user.reducer";
import {
  userProfileReducer,
  userProfileUpdateReducer,
} from "./userProfile/userProfile.reducer";
import {
  orderReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderMyOrdersReducer,
  orderListOrdersReducer,
  orderDeliverReducer,
} from "./order/order.reducer";
import userListReducer from "./userList/userList.reducer";
const rootReducer = combineReducers({
  product: productReducer,
  topProducts: topProductReducer,
  productDetail: productDetailReducer,
  productDelete: productDeleteReducer,
  createProduct: createProductReducer,
  updateProduct: updateProductReducer,
  createProductReview: productCreateReviewReducer,
  cart: cartReducer,
  user: userLoginReducer,
  userProfile: userProfileReducer,
  userProfileUpdate: userProfileUpdateReducer,
  order: orderReducer,
  orderDetails: orderDetailsReducer,
  orderList: orderListOrdersReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  myOrders: orderMyOrdersReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
});

export default rootReducer;
