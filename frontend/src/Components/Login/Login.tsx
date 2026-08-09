import React from "react";
import ShowPage from "./ShowPage/ShowPage";
import FormPage from "./FormPage/FormPage";

const Login = () => {

  document.title = "VidMod | Login"

  return (
    <div className="flex min-h-dvh w-full">
      <ShowPage/>
      <FormPage/>
    </div>
  );
};

export default Login;
