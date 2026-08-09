import React from "react";
import ShowPage from "./ShowPage/ShowPage";
import FormPage from "./FormPage/FormPage";

const Register = () => {

  document.title = "VidMod | Register"

  return (
    <div className="flex min-h-dvh w-full">
      <ShowPage />
      <FormPage />
    </div>
  );
};

export default Register;
