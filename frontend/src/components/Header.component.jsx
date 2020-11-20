import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, NavDropdown, Nav, Container } from "react-bootstrap";
import { connect } from "react-redux";
import SearchBox from "./SearchBox";
import { createStructuredSelector } from "reselect";
import { Route } from "react-router-dom";
import {
  selectUserInfo,
  selectIsUserFetching,
  selectUserError,
} from "../redux/user/user.selector";
import { selectCartTotalItems } from "../redux/cart/cart.selector";
import { userLogoutAsync } from "../redux/user/user.actions";
import {
  userProfileReset,
  userProfileUpdateReset,
} from "../redux/userProfile/userProfile.actions";
import {
  orderMyOrderReset,
  orderDetailsReset,
} from "../redux/order/order.actions";
import { userListReset } from "../redux/userList/userList.actions";
import { withRouter } from "react-router-dom";
const Header = ({
  history,
  userInfo,
  userLogout,
  userProfileReset,
  userProfileUpdateReset,
  cartTotalItems,
  myOrdersReset,
  userListReset,
  orderDetailsReset,
}) => {
  const logoutHandler = () => {
    userLogout();
    userProfileReset();
    userProfileUpdateReset();
    myOrdersReset();
    userListReset();
    orderDetailsReset();
    history.push("/");
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>
                  Cart({cartTotalItems})
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i>Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

const mapStateToProps = createStructuredSelector({
  userInfo: selectUserInfo,
  error: selectUserError,
  Loading: selectIsUserFetching,
  cartTotalItems: selectCartTotalItems,
});
const mapDispatchToProps = (dispatch) => ({
  userLogout: () => dispatch(userLogoutAsync()),
  userProfileReset: () => dispatch(userProfileReset()),
  userProfileUpdateReset: () => dispatch(userProfileUpdateReset()),
  myOrdersReset: () => dispatch(orderMyOrderReset()),
  userListReset: () => dispatch(userListReset()),
  orderDetailsReset: () => dispatch(orderDetailsReset()),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
