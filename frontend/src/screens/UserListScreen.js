import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  selectUserList,
  selectIsUserListFetching,
  selectUserListError,
} from "../redux/userList/userList.selector";
import { userListStartAsync } from "../redux/userList/userList.actions";
import { createStructuredSelector } from "reselect";
import {
  selectUserInfo,
  selectUserDeleteSuccess,
} from "../redux/user/user.selector";
import {
  userDeleteStartAsync,
  userDeleteReset,
} from "../redux/user/user.actions";
//component
const UserListScreen = ({
  userList,
  userListLoading,
  userListError,
  getUsersList,
  userInfo,
  history,
  userDeleteSuccess,
  deleteUser,
  deleteReset,
}) => {
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      getUsersList();
    } else {
      history.push("/login");
    }
  }, [getUsersList, history, userInfo, userDeleteSuccess]);
  const deleteHandler = (userId) => {
    if (window.confirm("Are you sure")) {
      deleteReset();
      deleteUser(userId);
    }
  };
  return (
    <>
      <h1>Users</h1>
      {userListLoading ? (
        <Loader />
      ) : userListError ? (
        <Message variant="danger">{userListError}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ADMIN</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>

                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i
                        className="fas fa-user-edit fa-1.5x"
                        title="Edit User"
                      ></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash fa-1.5x"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  userList: selectUserList,
  userListLoading: selectIsUserListFetching,
  userListError: selectUserListError,
  userInfo: selectUserInfo,
  userDeleteSuccess: selectUserDeleteSuccess,
});
const mapDispatchToProps = (dispatch) => ({
  getUsersList: () => dispatch(userListStartAsync()),
  deleteUser: (userId) => dispatch(userDeleteStartAsync(userId)),
  deleteReset: () => dispatch(userDeleteReset()),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserListScreen);
