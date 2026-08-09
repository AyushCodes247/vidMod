import React from "react";
import "./Register.css";
import ShowPage from "./ShowPage/ShowPage";
import FormPage from "./FormPage/FormPage";

const Register = () => {
  return (
    <div className="flex min-h-screen w-full">
      <ShowPage />
      <FormPage />
    </div>
  );
};

export default Register;
