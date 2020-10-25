import { createSelector } from "reselect";

const selectProductDetail = (state) => state.productDetail;

export const selectProductDetailItems = createSelector(
  [selectProductDetail],
  (productState) => productState.product
);

export const selectIsProductDetailFetching = createSelector(
  [selectProductDetail],
  (productState) => productState.isFetching
);

export const selectProductDetailError = createSelector(
  [selectProductDetail],
  (productState) => productState.errorMessage
);
