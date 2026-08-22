import React from "react";
import Navbar from "./NavBar/Navbar";
import Header from "./Header/Header";
import PlatformOverview from "./PlatformOverview/PlatformOverview";
import Platform from "./PlatformCard/Platform";
import PaltFormClaims from "./PaltFormClaims/PaltFormClaims";
import ReviewSection from "./ReviewSection/ReviewSection";
import Footer from "./Footer/Footer";

const LandingPage = () => {
  document.title = "VidMod - AI Moderated Video Hosting Platform"
  return (
    <div className="min-h-screen w-full bg-[#09090B]">
      <Navbar/>
      <Header/>
      <PlatformOverview/>
      <Platform/>
      <PaltFormClaims/>
      <ReviewSection/>
      <Footer/>
    </div>
  );
};

export default LandingPage;
