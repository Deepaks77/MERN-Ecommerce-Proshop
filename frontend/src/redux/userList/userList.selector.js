import { createSelector } from "reselect";

const selectListUser = (state) => state.userList;

export const selectUserList = createSelector(
  [selectListUser],
  (userList) => userList.users
);

export const selectIsUserListFetching = createSelector(
  [selectListUser],
  (userList) => userList.isFetching
);

export const selectUserListError = createSelector(
  [selectListUser],
  (userList) => userList.errorMessage
);
