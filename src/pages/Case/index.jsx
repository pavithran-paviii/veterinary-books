import React, { useState } from "react";
import classNames from "./case.module.scss";

const Case = () => {
  const allSteps = ["Assesment", "Infomation", "Billing", "Summary"];

  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className={classNames.caseContainer}>
      <div className={classNames.animalDetails}></div>
      <div className={classNames.allSteps}>
        {allSteps?.map((eachStep, index) => {
          return (
            <div
              key={eachStep + index}
              className={currentStep >= index && classNames.currentStep}
            >
              {eachStep}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Case;
