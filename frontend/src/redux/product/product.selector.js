import { createSelector } from "reselect";

const selectProducts = (state) => state.product;

export const selectProductItems = createSelector(
  [selectProducts],
  (product) => product.products
);

export const selectProductCurrentPage = createSelector(
  [selectProducts],
  (product) => product.page
);

export const selectProductNumberOfPages = createSelector(
  [selectProducts],
  (product) => product.pages
);

export const selectIsProductFetchning = createSelector(
  [selectProducts],
  (product) => product.isFetching
);

export const selectProductError = createSelector(
  [selectProducts],
  (product) => product.errorMessage
);

//top products
const selectProductTopReducer = (state) => state.topProducts;

export const selectTopProducts = createSelector(
  [selectProductTopReducer],
  (product) => product.products
);
export const selectIsTopProductFetchning = createSelector(
  [selectProductTopReducer],
  (product) => product.isFetching
);
export const selectTopProductError = createSelector(
  [selectProductTopReducer],
  (product) => product.errorMessage
);
