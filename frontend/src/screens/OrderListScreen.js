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
import { selectUserInfo } from "../redux/user/user.selector";
import {
  userDeleteStartAsync,
  userDeleteReset,
} from "../redux/user/user.actions";

import { orderListOrderStartAsync } from "../redux/order/order.actions";
import {
  selectListOrders,
  selectOrdersFetchning,
  selectOrdersError,
} from "../redux/order/order.selector";
//component
const OrderListScreen = ({
  userList,
  userListLoading,
  userListError,
  getUsersList,
  userInfo,
  history,
  deleteUser,
  deleteReset,
  getOrderList,
  orders,
  error,
  loading,
}) => {
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      getOrderList();
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, [getUsersList, history, userInfo]);

  return (
    <>
      <h1>Orders</h1>
      {userListLoading ? (
        <Loader />
      ) : userListError ? (
        <Message variant="danger">{userListError}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i
                      className="fas fa-times"
                      style={{ color: "red", paddingLeft: "45px" }}
                    ></i>
                  )}
                </td>

                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i
                      className="fas fa-times"
                      style={{ color: "red", paddingLeft: "45px" }}
                    ></i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
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
  orders: selectListOrders,
  loading: selectOrdersFetchning,
  error: selectOrdersError,
});
const mapDispatchToProps = (dispatch) => ({
  getUsersList: () => dispatch(userListStartAsync()),
  deleteUser: (userId) => dispatch(userDeleteStartAsync(userId)),
  deleteReset: () => dispatch(userDeleteReset()),
  getOrderList: () => dispatch(orderListOrderStartAsync()),
});
export default connect(mapStateToProps, mapDispatchToProps)(OrderListScreen);
