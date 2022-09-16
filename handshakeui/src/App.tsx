import React from "react";
import "./App.scss";
import Home from "./Components/LandingPage/Home";
import Footer from "./Components/MainComponets/Footer";
import Header from "./Components/MainComponets/Header";

function App() {
  return (
    <div className="app">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
