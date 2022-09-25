import React from "react";
import "./App.scss";
import HomePage from "./Pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/MainComponets/Header";
import Footer from "./Components/MainComponets/Footer";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
