import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { userLoginStartAsync } from "../redux/user/user.actions";
import FormContainer from "../components/FormContainer";
import {
  selectUserInfo,
  selectIsUserFetching,
  selectUserError,
} from "../redux/user/user.selector";
import { createStructuredSelector } from "reselect";

//Component
const LoginScreen = ({
  location,
  loginAsync,
  userInfo,
  error,
  loading,
  history,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const submitHandler = (e) => {
    e.preventDefault();
    loginAsync(email, password);
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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
            required
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer ?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

const mapStatetoProps = createStructuredSelector({
  userInfo: selectUserInfo,
  error: selectUserError,
  loading: selectIsUserFetching,
});
const mapDispatchToProps = (dispatch) => ({
  loginAsync: (email, password) =>
    dispatch(userLoginStartAsync(email, password)),
});
export default connect(mapStatetoProps, mapDispatchToProps)(LoginScreen);
