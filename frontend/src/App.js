import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header.component.jsx";
import Footer from "./components/Footer.component.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import Error404Page from "./screens/Error404Page";
const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />{" "}
            {/*cart/:id? means id is optional it can be present or not */}
            <Route component={Error404Page} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
