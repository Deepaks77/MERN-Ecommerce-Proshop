import axios from "axios";
import userProfileActionTypes from "./userProfile.actionTypes";
import { setUpdatedUser } from "../user/user.actions";
export const userProfileStart = () => ({
  type: userProfileActionTypes.USER_PROFILE_START,
});

export const userProfileSuccess = (userProfile) => ({
  type: userProfileActionTypes.USER_PROFILE_SUCCESS,
  payload: userProfile,
});

export const userProfileFailure = (errorMessage) => ({
  type: userProfileActionTypes.USER_PROFILE_FAILURE,
  payload: errorMessage,
});

export const userProfileReset = () => ({
  type: userProfileActionTypes.USER_PROFILE_RESET,
});

export const userProfileStartAsync = (placeholder) => async (
  dispatch,
  getState
) => {
  dispatch(userProfileStart());

  try {
    const {
      userInfo: { token },
    } = getState().user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/users/${placeholder}`, config);
    dispatch(userProfileSuccess(data));
  } catch (error) {
    dispatch(
      userProfileFailure(
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message
      )
    );
  }
};

export const userProfileUpdateReset = () => ({
  type: userProfileActionTypes.USER_PROFILE_UPDATE_RESET,
});

export const userProfileSetSuccessNull = () => ({
  type: userProfileActionTypes.USER_PROFILE_SET_SUCCESS_NULL,
});
export const userProfileUpdateStart = () => ({
  type: userProfileActionTypes.USER_PROFILE_UPDATE_START,
});

export const userProfileUpdateSuccess = (userInfo) => ({
  type: userProfileActionTypes.USER_PROFILE_UPDATE_SUCCESS,
  payload: userInfo,
});

export const userProfileUpdateFailure = (errorMessage) => ({
  type: userProfileActionTypes.USER_PROFILE_UPDATE_FAILURE,
  payload: errorMessage,
});

export const userProfileUpdateStartAsync = (updatedUser) => async (
  dispatch,
  getState
) => {
  dispatch(userProfileUpdateStart());
  try {
    const {
      userInfo: { token },
    } = getState().user;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(`/api/users/profile`, updatedUser, config);
    dispatch(userProfileUpdateSuccess(data));
    dispatch(userProfileSuccess({ ...data, token: undefined }));
    dispatch(setUpdatedUser(data));
  } catch (error) {
    dispatch(
      userProfileUpdateFailure(
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message
      )
    );
  }
};
