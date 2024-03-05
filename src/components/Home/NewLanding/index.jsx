import React, { useEffect, useRef } from "react";
import classNames from "./newlanding.module.scss";

//assets
import fullLogo from "../../../assets/images/Veterinary.png";
import { FaArrowRight } from "react-icons/fa6";
import { TiTickOutline } from "react-icons/ti";
import { LiaDotCircleSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

const NewLanding = ({ newLandingVisible, setNewLandingVisible }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Check if the section is currently intersecting with the viewport
          setNewLandingVisible(!entry.isIntersecting);
        });
      },
      { threshold: 0.1 } // Adjust the threshold as needed
    );

    // Start observing the section element
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup the observer when the component is unmounted
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [newLandingVisible]);

  return (
    <section className={classNames.landing} ref={sectionRef}>
      <div className={classNames.wrapper}>
        <div className={classNames.leftContainer}>
          <img src={fullLogo} alt="fullLogo" />
          <div>
            {/* <h2>ONE STOP FOR ALL YOUR PET'S RECORDS</h2> */}
            <h2>Pet Records</h2>

            <h5>Create an account & manage the medical records</h5>
            <button className={classNames.getStarted}>
              Get Started <FaArrowRight />
            </button>
            <div className={classNames.procedures}>
              <div className={classNames.selectedDiv}>
                <TiTickOutline />
              </div>
              <div>
                <LiaDotCircleSolid />
              </div>
              <div>
                <LiaDotCircleSolid />
              </div>
              <div>
                <LiaDotCircleSolid />
              </div>
            </div>
          </div>
        </div>
        <div className={classNames.rightContainer}>
          <div className={classNames.buttonContainer}>
            <Link className={classNames.loginButton} to="/signin">
              SIGN IN
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewLanding;
