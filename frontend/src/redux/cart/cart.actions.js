import axios from "axios";
import cartActionTypes from "./cart.actionTypes";

export const addCartItemStart = () => ({
  type: cartActionTypes.CART_ADD_ITEM_START,
});

export const addCartItemSuccess = (productDetail) => ({
  type: cartActionTypes.CART_ADD_ITEM_SUCCESS,
  payload: productDetail,
});

export const addCartItemFailure = (errorMessage) => ({
  type: cartActionTypes.CART_ADD_ITEM_FAILURE,
  payload: errorMessage,
});

export const removeCartItem = (pid) => ({
  type: cartActionTypes.CART_REMOVE_ITEM,
  payload: pid,
});

export const removeCartItemAsync = (pid) => async (dispatch, getState) => {
  console.log("Recieved");
  dispatch(removeCartItem(pid));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const addCartItemStartAsync = (productId, qty) => async (
  dispatch,
  getState
) => {
  dispatch(addCartItemStart());
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch(
      addCartItemSuccess({
        pid: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      })
    );
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch(
      addCartItemFailure(
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message
      )
    );
  }
};
