import userActionTypes from "./user.actionTypes";
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
export const INITIAL_STATE_USER = {
  userInfo: userInfoFromLocalStorage,
  isFetching: false,
  errorMessage: null,
};

export const userLoginReducer = (state = INITIAL_STATE_USER, action) => {
  switch (action.type) {
    case userActionTypes.USER_SET_UPDATED_USER: {
      return {
        ...state,
        userInfo: action.payload,
      };
    }
    case userActionTypes.USER_LOGIN_START: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case userActionTypes.USER_LOGIN_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        userInfo: action.payload,
      };
    }
    case userActionTypes.USER_LOGIN_FAILURE: {
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    }
    case userActionTypes.USER_LOGOUT: {
      return {
        ...INITIAL_STATE_USER,
        userInfo: null,
      };
    }
    case userActionTypes.USER_SIGNUP_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case userActionTypes.USER_SIGNUP_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        userInfo: action.payload,
      };
    }
    case userActionTypes.USER_SIGNUP_FAILURE: {
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    }
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case userActionTypes.USER_DELETE_START: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case userActionTypes.USER_DELETE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        success: true,
      };
    }
    case userActionTypes.USER_DELETE_FAILURE: {
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    }
    case userActionTypes.USER_DELETE_RESET: {
      return {};
    }
    default: {
      return state;
    }
  }
};

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case userActionTypes.USER_UPDATE_START: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case userActionTypes.USER_UPDATE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        success: true,
      };
    }
    case userActionTypes.USER_UPDATE_FAILURE: {
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    }
    case userActionTypes.USER_UPDATE_RESET: {
      return { user: {} };
    }
    default: {
      return state;
    }
  }
};
