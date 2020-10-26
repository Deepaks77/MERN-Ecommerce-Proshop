import cartActionTypes from "./cart.actionTypes";
import { addItemToCart, clearItemFromCart } from "./cart.utils.js";
const cartItemsFromLocalStore = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const INITIAL_STATE = {
  cartItems: cartItemsFromLocalStore,
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
    default:
      return state;
  }
};

export default cartReducer;
