import React from "react";
import "./App.scss";
import HomePage from "./Pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/MainComponets/Header";
import Footer from "./Components/MainComponets/Footer";
import ResetPassword from "./Pages/ResetPassword";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/reset" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
