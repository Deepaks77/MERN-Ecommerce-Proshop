import cartActionTypes from "./cart.actionTypes";
import { addItemToCart, clearItemFromCart } from "./cart.utils.js";
const cartItemsFromLocalStore = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const shippingAddressFromLocalStore = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : null;
const paymentMethodFromLocalStore = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : null;

const INITIAL_STATE = {
  cartItems: cartItemsFromLocalStore,
  shippingAddress: shippingAddressFromLocalStore,
  paymentMethod: paymentMethodFromLocalStore,
  isFetching: false,
  errorMessage: null,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartActionTypes.CART_ADD_ITEM_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case cartActionTypes.CART_ADD_ITEM_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    }
    case cartActionTypes.CART_ADD_ITEM_FAILURE: {
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    }
    case cartActionTypes.CART_REMOVE_ITEM: {
      return {
        ...state,
        cartItems: clearItemFromCart(state.cartItems, action.payload),
      };
    }
    case cartActionTypes.CART_SAVE_SHIPPING_ADDRESS: {
      return {
        ...state,
        shippingAddress: action.payload,
      };
    }

    case cartActionTypes.CART_SAVE_PAYMENT_METHOD: {
      return {
        ...state,
        paymentMethod: action.payload,
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
