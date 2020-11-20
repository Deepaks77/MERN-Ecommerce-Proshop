import { createSelector } from "reselect";

const selectUserProfile = (state) => state.userProfile;
const selectUserProfileUpdate = (state) => state.userProfileUpdate;
export const selectUserProfileDetails = createSelector(
  [selectUserProfile],
  (userProfile) => userProfile.userProfile
);

export const selectIsUserProfileFetching = createSelector(
  [selectUserProfile],
  (userProfile) => userProfile.isFetching
);

export const selectUserProfileError = createSelector(
  [selectUserProfile],
  (userProfile) => userProfile.errorMessage
);

export const selectUserProfileUpdateIsFetching = createSelector(
  [selectUserProfileUpdate],
  (userProfileUpdate) => userProfileUpdate.isFetching
);

export const selectUserProfileUpdateError = createSelector(
  [selectUserProfileUpdate],
  (userProfileUpdate) => userProfileUpdate.errorMessage
);

export const selectUserProfileUpdateSuccess = createSelector(
  [selectUserProfileUpdate],
  (userProfileUpdate) => userProfileUpdate.success
);
