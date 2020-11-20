import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header.component.jsx";
import Footer from "./components/Footer.component.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import Error404Page from "./screens/Error404Page";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/product/:id" component={ProductScreen} />
            <Route exact path="/order/:id" component={OrderScreen} />
            <Route path="/cart/:id?" component={CartScreen} />{" "}
            {/*cart/:id? means id is optional it can be present or not */}
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/shipping" component={ShippingScreen} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/profile" component={ProfileScreen} />
            <Route exact path="/payment" component={PaymentScreen} />
            <Route exact path="/placeorder" component={PlaceOrderScreen} />
            <Route exact path="/admin/userlist" component={UserListScreen} />
            <Route
              exact
              path="/admin/user/:id/edit"
              component={UserEditScreen}
            />
            <Route
              exact
              path="/admin/productlist/"
              component={ProductListScreen}
            />
            <Route
              exact
              path="/admin/productlist/:pageNumber"
              component={ProductListScreen}
            />
            <Route
              exact
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
            />
            <Route exact path="/admin/orderlist" component={OrderListScreen} />
            <Route exact path="/search/:keyword" component={HomeScreen} />
            <Route exact path="/page/:pageNumber" component={HomeScreen} />
            <Route
              exact
              path="/search/:keyword/page/:pageNumber"
              component={HomeScreen}
            />
            <Route component={Error404Page} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
