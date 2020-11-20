import userListActionTypes from "./userList.actionTypes";

const INITIAL_STATE = {
  users: [],
  isFetching: false,
  errorMessage: null,
};

const userListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userListActionTypes.USER_LIST_START: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case userListActionTypes.USER_LIST_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        users: action.payload,
      };
    }
    case userListActionTypes.USER_LIST_FAILURE: {
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    }
    case userListActionTypes.USER_LIST_RESET: {
      return {
        ...INITIAL_STATE,
      };
    }
    default:
      return state;
  }
};

export default userListReducer;
