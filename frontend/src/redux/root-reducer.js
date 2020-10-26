import { combineReducers } from "redux";
import productReducer from "./product/product.reducer";
import productDetailReducer from "./productDetail/productDetails.reducer";
import cartReducer from "./cart/cart.reducer";
const rootReducer = combineReducers({
  product: productReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
});

export default rootReducer;
