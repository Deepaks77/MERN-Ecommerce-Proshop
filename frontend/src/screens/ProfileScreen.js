import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  userProfileStartAsync,
  userProfileUpdateStartAsync,
  userProfileSetSuccessNull,
} from "../redux/userProfile/userProfile.actions";
import {
  selectUserProfileDetails,
  selectIsUserProfileFetching,
  selectUserProfileError,
  selectUserProfileUpdateIsFetching,
  selectUserProfileUpdateError,
  selectUserProfileUpdateSuccess,
} from "../redux/userProfile/userProfile.selector";
import { selectUserInfo } from "../redux/user/user.selector";
import { createStructuredSelector } from "reselect";
import {
  selectMyOrderDetails,
  selectIsMyOrderFetchning,
  selectMyOrderError,
} from "../redux/order/order.selector";
import { orderMyOrderStartAsync } from "../redux/order/order.actions";
//Component
const ProfileScreen = ({
  location,
  userProfile,
  userInfo,
  error,
  loading,
  history,
  getUserProfile,
  updateUserProfile,
  updateSuccess,
  updateError,
  updateLoading,
  setSuccessNullOnUnmount,
  myOrders,
  myOrdersLoading,
  myOrdersError,
  getMyOrders,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  // const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (!userInfo) {
      console.log(location);
      history.push(`/login?redirect=${location.pathname}`);
    } else {
      if (!userProfile || userProfile._id !== userInfo._id) {
        getUserProfile("profile");
        getMyOrders();
      } else {
        setName(userProfile.name);
        setEmail(userProfile.email);
      }
    }
    return () => {
      setTimeout(() => {
        setSuccessNullOnUnmount();
      }, 3000);
    };
  }, [
    history,
    userInfo,
    getUserProfile,
    userProfile,
    setSuccessNullOnUnmount,
    location,
    getMyOrders,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      setMessage(null);
      updateUserProfile({ name, email, password });
    }
  };

  return (
    <>
      {error || updateError ? (
        <>
          <Link className="btn btn-light my-3" to="/">
            Go Back
          </Link>
          <Message variant="danger">{error}, Please try again</Message>
        </>
      ) : (
        <Row>
          <Col md={3}>
            <h2>User Profile</h2>
            {message && <Message variant="danger">{message}</Message>}
            {(loading || updateLoading) && <Loader />}
            {updateSuccess && !message && (
              <Message variant="success">Profile Updated</Message>
            )}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          </Col>
          <Col md={9}>
            <h2>My Orders</h2>
            {myOrdersLoading ? (
              <Loader />
            ) : myOrdersError ? (
              <Message variant="danger">{myOrdersError}</Message>
            ) : (
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {myOrders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red", paddingLeft: "35px" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red", paddingLeft: "35px" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button className="btn-sm" variant="light">
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      )}
    </>
  );
};

const mapStatetoProps = createStructuredSelector({
  userInfo: selectUserInfo,
  userProfile: selectUserProfileDetails,
  error: selectUserProfileError,
  loading: selectIsUserProfileFetching,
  updateLoading: selectUserProfileUpdateIsFetching,
  updateError: selectUserProfileUpdateError,
  updateSuccess: selectUserProfileUpdateSuccess,
  myOrders: selectMyOrderDetails,
  myOrdersLoading: selectIsMyOrderFetchning,
  myOrdersError: selectMyOrderError,
});
const mapDispatchToProps = (dispatch) => ({
  getUserProfile: (placeholder) => dispatch(userProfileStartAsync(placeholder)),
  updateUserProfile: (updatedUser) =>
    dispatch(userProfileUpdateStartAsync(updatedUser)),
  setSuccessNullOnUnmount: () => dispatch(userProfileSetSuccessNull()),
  getMyOrders: () => dispatch(orderMyOrderStartAsync()),
});
export default connect(mapStatetoProps, mapDispatchToProps)(ProfileScreen);
