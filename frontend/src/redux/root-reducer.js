import { combineReducers } from "redux";
import productReducer from "./product/product.reducer";
import productDetailReducer from "./productDetail/productDetails.reducer";
const rootReducer = combineReducers({
  product: productReducer,
  productDetail: productDetailReducer,
});

export default rootReducer;
