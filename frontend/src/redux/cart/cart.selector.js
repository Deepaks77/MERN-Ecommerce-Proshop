import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectIsCartItemFetchning = createSelector(
  [selectCart],
  (cart) => cart.isFetching
);

export const selectCartItemError = createSelector(
  [selectCart],
  (cart) => cart.errorMessage
);
