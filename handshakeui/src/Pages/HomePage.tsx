import React from "react";
import Home from "../Components/LandingPage/Home";
import Footer from "../Components/MainComponets/Footer";
import Header from "../Components/MainComponets/Header";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="app">
      <Home />
    </div>
  );
};

export default HomePage;
