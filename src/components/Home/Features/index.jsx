import React from "react";
import classNames from "./features.module.scss";

//imports
import { LiaDogSolid } from "react-icons/lia";

const Features = () => {
  return (
    <section className={classNames.services}>
      <div className={classNames.leftCircle}></div>
      <div className={classNames.forWhom}>
        <h2>Key Features...</h2>
        <h5>
          <LiaDogSolid />
          Pet Profiles
        </h5>
        <h5>
          <LiaDogSolid />
          Vaccination Reminders
        </h5>
        <h5>
          <LiaDogSolid />
          Patient Records
        </h5>
        <h5>
          <LiaDogSolid />
          Medication Tracking
        </h5>
        <h5>
          <LiaDogSolid />
          Emergency Information
        </h5>
        <h5>
          <LiaDogSolid />
          Automated Reminders
        </h5>
      </div>
      <div className="copyrights">
        Copyright © 2023 Veterinary Books Owned and Operated by Veterinary
        Books, All Rights Reserved
      </div>
    </section>
  );
};

export default Features;
