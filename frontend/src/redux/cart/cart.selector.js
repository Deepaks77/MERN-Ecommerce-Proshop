import { createSelector } from "reselect";

export const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectIsCartItemFetchning = createSelector(
  [selectCart],
  (cart) => cart.isFetching
);

export const selectCartTotalItems = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((acc, item) => acc + item.qty, 0)
);

export const selectCartItemError = createSelector(
  [selectCart],
  (cart) => cart.errorMessage
);

export const selectCartItemsPrice = createSelector(
  [selectCartItems],
  (cartItems) =>
    Number(
      cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
    )
);

export const selectCartShippingPrice = createSelector(
  [selectCartItemsPrice],
  (cartItemsPrice) => Number(cartItemsPrice > 100 ? 0 : 50)
);

export const selectCartTaxPrice = createSelector(
  [selectCartItemsPrice],
  (cartItemsPrice) => Number(cartItemsPrice * 0.15).toFixed(2)
);

export const selectCartTotalPrice = createSelector(
  [selectCartItemsPrice, selectCartShippingPrice, selectCartTaxPrice],
  (cartItemsPrice, cartShippingPrice, cartTaxPrice) => {
    console.log("TaxPrice", cartTaxPrice);
    return Number(
      cartItemsPrice + cartShippingPrice + Number(cartTaxPrice)
    ).toFixed(2);
  }
);
