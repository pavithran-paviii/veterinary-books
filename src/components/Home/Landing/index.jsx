import React from "react";
import classNames from "./landing.module.scss";

//imports
import Lottie from "lottie-react";

//assets
import whiteDog from "../../../assets/images/animations/whitedog.json";

const Landing = () => {
  return (
    <section className={classNames.landing}>
      <div className={classNames.wrapper}>
        <h1>
          <div>ONE STOP FOR</div>{" "}
          <div>
            ALL <div>Create an account & manage the medical records</div>
          </div>{" "}
          <div>THE PET'S RECORDS</div>
        </h1>
        {/* <ul>
          <li>Docters can manage all their clients records.</li>
          <li>Pet owners can manage all their pets medical history</li>
          <li>
            Both docters & pet owners will get remainders on the checkups &
            vaccination
          </li>
        </ul> */}
        <Lottie animationData={whiteDog} />
      </div>
    </section>
  );
};

export default Landing;
