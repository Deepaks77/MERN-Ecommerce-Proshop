import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectUserInfo = createSelector(
  [selectUser],
  (user) => user.userInfo
);

export const selectIsUserFetching = createSelector(
  [selectUser],
  (user) => user.isFetching
);

export const selectUserError = createSelector(
  [selectUser],
  (user) => user.errorMessage
);

//userDelete
const selectUserDelete = (state) => state.userDelete;
export const selectIsUserDeleteFetching = createSelector(
  [selectUserDelete],
  (userDelete) => userDelete.isFetching
);

export const selectUserDeleteSuccess = createSelector(
  [selectUserDelete],
  (userDelete) => userDelete.success
);

//userUpdate

const selectUserUpdate = (state) => state.userUpdate;
export const selectIsUserUpdateFetching = createSelector(
  [selectUserUpdate],
  (userUpdate) => userUpdate.isFetching
);

export const selectUserUpdateSuccess = createSelector(
  [selectUserUpdate],
  (userUpdate) => userUpdate.success
);

export const selectUserUpdateError = createSelector(
  [selectUserUpdate],
  (userUpdate) => userUpdate.errorMessage
);
