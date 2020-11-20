import axios from "axios";
import userActionTypes from "./user.actionTypes";
import { userProfileSuccess } from "../userProfile/userProfile.actions";
export const setUpdatedUser = (updatedUser) => ({
  type: userActionTypes.USER_SET_UPDATED_USER,
  payload: updatedUser,
});
export const userLoginStart = () => ({
  type: userActionTypes.USER_LOGIN_START,
});

export const userLoginSuccess = (userInfo) => ({
  type: userActionTypes.USER_LOGIN_SUCCESS,
  payload: userInfo,
});

export const userLoginFailure = (errorMessage) => ({
  type: userActionTypes.USER_LOGIN_FAILURE,
  payload: errorMessage,
});

export const userLogout = () => ({
  type: userActionTypes.USER_LOGOUT,
});
export const userLoginStartAsync = (email, password) => async (dispatch) => {
  dispatch(userLoginStart());
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    dispatch(userLoginSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(
      userLoginFailure(
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message
      )
    );
  }
};
export const userLogoutAsync = () => (dispatch) => {
  dispatch(userLogout());
  localStorage.setItem("userInfo", null);
};

export const userSignupStart = () => ({
  type: userActionTypes.USER_SIGNUP_START,
});

export const userSignupSuccess = (userInfo) => ({
  type: userActionTypes.USER_SIGNUP_SUCCESS,
  payload: userInfo,
});

export const userSignupFailure = (errorMessage) => ({
  type: userActionTypes.USER_SIGNUP_FAILURE,
  payload: errorMessage,
});

export const userSignupStartAsync = (name, email, password) => async (
  dispatch
) => {
  dispatch(userSignupStart());
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );
    dispatch(userSignupSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(
      userSignupFailure(
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message
      )
    );
  }
};

//userDelete
export const userDeleteStart = () => ({
  type: userActionTypes.USER_DELETE_START,
});

export const userDeleteSuccess = (userInfo) => ({
  type: userActionTypes.USER_DELETE_SUCCESS,
  payload: userInfo,
});

export const userDeleteFailure = (errorMessage) => ({
  type: userActionTypes.USER_DELETE_FAILURE,
  payload: errorMessage,
});

export const userDeleteReset = () => ({
  type: userActionTypes.USER_DELETE_RESET,
});
export const userDeleteStartAsync = (userId) => async (dispatch, getState) => {
  dispatch(userDeleteStart());
  try {
    const {
      userInfo: { token },
    } = getState().user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`/api/users/${userId}`, config);
    dispatch(userDeleteSuccess());
  } catch (error) {
    dispatch(
      userDeleteFailure(
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message
      )
    );
  }
};

//userUpdate
export const userUpdateStart = () => ({
  type: userActionTypes.USER_UPDATE_START,
});

export const userUpdateSuccess = (userInfo) => ({
  type: userActionTypes.USER_UPDATE_SUCCESS,
  payload: userInfo,
});

export const userUpdateFailure = (errorMessage) => ({
  type: userActionTypes.USER_UPDATE_FAILURE,
  payload: errorMessage,
});

export const userUpdateReset = () => ({
  type: userActionTypes.USER_UPDATE_RESET,
});
export const userUpdateStartAsync = (userId, userData) => async (
  dispatch,
  getState
) => {
  dispatch(userUpdateStart());
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
    const { data } = await axios.put(`/api/users/${userId}`, userData, config);
    dispatch(userUpdateSuccess());
    dispatch(userProfileSuccess(data));
  } catch (error) {
    dispatch(
      userUpdateFailure(
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message
      )
    );
  }
};
