import React from "react";
import { Routes, Route } from "react-router";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import LandingPage from "./Components/LandingPage/LandingPage";
import VerifyEmail from "./Components/VerifyEmail/VerifyEmail";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/verify" element={<VerifyEmail/>}/>
      </Routes>
    </>
  );
};

export default App;
