import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header.component.jsx";
import Footer from "./components/Footer.component.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
