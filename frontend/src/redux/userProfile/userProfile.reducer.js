import userProfileActionTypes from "./userProfile.actionTypes";
import { INITIAL_STATE_USER } from "../user/user.reducer";
const INITIAL_STATE = {
  userProfile: null,
  isFetching: false,
  errorMessage: null,
};

export const userProfileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userProfileActionTypes.USER_PROFILE_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case userProfileActionTypes.USER_PROFILE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        userProfile: action.payload,
      };
    }
    case userProfileActionTypes.USER_PROFILE_FAILURE: {
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    }
    case userProfileActionTypes.USER_PROFILE_RESET: {
      return {
        ...INITIAL_STATE,
      };
    }
    default:
      return state;
  }
};

export const userProfileUpdateReducer = (
  state = { ...INITIAL_STATE_USER, success: false },
  action
) => {
  switch (action.type) {
    case userProfileActionTypes.USER_PROFILE_SET_SUCCESS_NULL: {
      return {
        ...state,
        success: false,
      };
    }
    case userProfileActionTypes.USER_PROFILE_UPDATE_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case userProfileActionTypes.USER_PROFILE_UPDATE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        userInfo: action.payload,
        success: true,
      };
    }
    case userProfileActionTypes.USER_PROFILE_UPDATE_FAILURE: {
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    }

    case userProfileActionTypes.USER_PROFILE_UPDATE_RESET: {
      return {
        ...state,
        userInfo: null,
      };
    }
    default:
      return state;
  }
};
