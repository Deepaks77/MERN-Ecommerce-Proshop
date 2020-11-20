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

//product create by admin
const selectProductCreate = (state) => state.createProduct;
export const selectCreateProductSuccess = createSelector(
  [selectProductCreate],
  (product) => product.success
);
export const selectCreatedProduct = createSelector(
  [selectProductCreate],
  (product) => product.product
);
export const selectIsCreateProductFetching = createSelector(
  [selectProductCreate],
  (product) => product.isFetching
);

export const selectCreateProductError = createSelector(
  [selectProductCreate],
  (product) => product.errorMessage
);

//product update by admin
const selectProductUpdate = (state) => state.updateProduct;
export const selectUpdateProductSuccess = createSelector(
  [selectProductUpdate],
  (product) => product.success
);
export const selectUpdatedProduct = createSelector(
  [selectProductUpdate],
  (product) => product.product
);
export const selectIsUpdateProductFetching = createSelector(
  [selectProductUpdate],
  (product) => product.isFetching
);

export const selectUpdateProductError = createSelector(
  [selectProductUpdate],
  (product) => product.errorMessage
);

//product delete by admin
const selectProductDelete = (state) => state.productDelete;
export const selectProductDeleteSuccess = createSelector(
  [selectProductDelete],
  (product) => product.success
);

export const selectIsProductDeleteFetching = createSelector(
  [selectProductDelete],
  (product) => product.isFetching
);

export const selectProductDeleteError = createSelector(
  [selectProductDelete],
  (product) => product.errorMessage
);

//create product review
const selectCreateProductReview = (state) => state.createProductReview;
export const selectCreateProductReviewSuccess = createSelector(
  [selectCreateProductReview],
  (productReview) => productReview.success
);

export const selectIsCreateProductReviewFetching = createSelector(
  [selectCreateProductReview],
  (productReview) => productReview.isFetching
);

export const selectCreateProductReviewError = createSelector(
  [selectCreateProductReview],
  (productReview) => productReview.errorMessage
);
