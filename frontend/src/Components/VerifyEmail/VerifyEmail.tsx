import React from "react";
import ShowPage from "./ShowPage/ShowPage";
import FormPage from "./FormPage/FormPage";

const VerifyEmail = () => {
  document.title = "VidMod | Verify Email";

  return (
    <div className="min-h-screen w-full flex bg-[#09090B]">
      <div className="hidden md:block md:w-[60%]">
        <ShowPage />
      </div>

      <div className="w-full md:w-[40%]">
        <FormPage />
      </div>
    </div>
  );
};

export default VerifyEmail;
