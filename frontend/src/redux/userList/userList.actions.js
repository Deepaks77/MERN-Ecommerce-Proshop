import axios from "axios";
import userListActionTypes from "./userList.actionTypes";

export const userListStart = () => ({
  type: userListActionTypes.USER_LIST_START,
});
export const userListSuccess = (users) => ({
  type: userListActionTypes.USER_LIST_SUCCESS,
  payload: users,
});

export const userListFailure = (error) => ({
  type: userListActionTypes.USER_LIST_FAILURE,
  payload: error,
});

export const userListReset = () => ({
  type: userListActionTypes.USER_LIST_RESET,
});
export const userListStartAsync = () => async (dispatch, getState) => {
  dispatch(userListStart());
  try {
    const {
      userInfo: { token },
    } = getState().user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data: users } = await axios.get("/api/users", config);
    dispatch(userListSuccess(users));
  } catch (error) {
    dispatch(
      userListFailure(
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message
      )
    );
  }
};
