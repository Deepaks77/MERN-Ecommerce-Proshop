import { createSelector } from "reselect";

const selectProducts = (state) => state.product;

export const selectProductItems = createSelector(
  [selectProducts],
  (product) => product.products
);

export const selectIsProductFetchning = createSelector(
  [selectProducts],
  (product) => product.isFetching
);

export const selectProductError = createSelector(
  [selectProducts],
  (product) => product.errorMessage
);
