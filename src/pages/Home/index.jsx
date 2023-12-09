import React, { useEffect, useRef, useState } from "react";
import "./home.scss";

//imports
import Navbar from "../../components/Navbar";
import Landing from "../../components/Home/Landing";
import Features from "../../components/Home/Features";
import NewLanding from "../../components/Home/NewLanding";
import Procedure from "../../components/Home/Procedure";
import Footer from "../../components/Home/Footer";

const Home = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [newLandingVisible, setNewLandingVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Show navbar if scrolling up, if at the top of the page, or if NewLanding is not visible
      setShowNavbar(scrollY <= prevScrollY || scrollY === 0);

      // Update previous scroll position
      setPrevScrollY(scrollY);
    };

    // Attach the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  return (
    <>
      <Navbar isAppearing={showNavbar && newLandingVisible} />
      {/* <Landing />
      <Features /> */}
      <NewLanding setNewLandingVisible={setNewLandingVisible} />
      <Procedure />
      <Footer />
    </>
  );
};

export default Home;
