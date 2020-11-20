import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
//import { userSignupStartAsync } from "../redux/user/user.actions";
import FormContainer from "../components/FormContainer";
// import {
//   selectUserInfo,
//   selectIsUserFetching,
//   selectUserError,
// } from "../redux/user/user.selector";
import { userProfileStartAsync } from "../redux/userProfile/userProfile.actions";
import {
  selectUserProfileDetails,
  selectIsUserProfileFetching,
  selectUserProfileError,
} from "../redux/userProfile/userProfile.selector";
import {
  selectIsUserUpdateFetching,
  selectUserUpdateSuccess,
  selectUserUpdateError,
} from "../redux/user/user.selector";
import {
  userUpdateStartAsync,
  userUpdateReset,
} from "../redux/user/user.actions";
import { createStructuredSelector } from "reselect";

//Component
const UserEditScreen = ({
  error,
  loading,
  history,
  match,
  getUserProfile,
  usersProfile,
  updateUser,
  errorUpdate,
  loadingUpdate,
  successUpdate,
  userUpdateReset,
}) => {
  const userId = match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (successUpdate) {
      console.log("inside it ");
      userUpdateReset();
      history.push(`/admin/userlist`);
    } else {
      if (!usersProfile || usersProfile._id !== userId) {
        console.log("inside it");
        getUserProfile(userId);
      } else {
        setName(usersProfile.name);
        setEmail(usersProfile.email);
        setIsAdmin(usersProfile.isAdmin);
      }
    }
    // eslint-disable-next-line
  }, [history, usersProfile, userId, successUpdate]);
  //   [history, usersProfile, userId, successUpdate, userUpdateReset]
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Button Clicked");
    updateUser(usersProfile._id, {
      _id: usersProfile._id,
      name,
      email,
      isAdmin,
    });
  };
  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
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
            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

const mapStatetoProps = createStructuredSelector({
  usersProfile: selectUserProfileDetails,
  error: selectUserProfileError,
  loading: selectIsUserProfileFetching,
  loadingUpdate: selectIsUserUpdateFetching,
  successUpdate: selectUserUpdateSuccess,
  errorUpdate: selectUserUpdateError,
});
const mapDispatchToProps = (dispatch) => ({
  getUserProfile: (placeholder) => dispatch(userProfileStartAsync(placeholder)),
  updateUser: (userId, userInfo) =>
    dispatch(userUpdateStartAsync(userId, userInfo)),
  userUpdateReset: () => dispatch(userUpdateReset()),
});
export default connect(mapStatetoProps, mapDispatchToProps)(UserEditScreen);
