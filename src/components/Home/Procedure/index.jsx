import React from "react";
import classNames from "./procedure.module.scss";

const Procedure = () => {
  return (
    <section className={classNames.procedure}>
      <div className={classNames.wrapper}>
        <h1>
          Streamline pet care with our intuitive app – effortlessly organize and
          maintain your pet's records, appointments, and health details. Your
          one-stop solution for hassle-free and efficient pet management
        </h1>
        <div className={classNames.stepByStep}>
          <div className={classNames.firstBox}>
            <h2>For Client</h2>
            <div>Create an account with the client account type.</div>
          </div>
          <div className={classNames.otherboxes}>
            <div>
              If there's an existing record of your pet with the doctor, import
              it using the registration number. Otherwise, create your own pet
              record.
            </div>
            <div>Complete all personal details.</div>
            <div>
              Verify your WhatsApp and email to receive notifications for
              vaccinations.
            </div>
          </div>
        </div>
        <div
          className={`${classNames.stepByStep} ${classNames.stepByStepDocter}`}
        >
          <div className={classNames.firstBox}>
            <h2>For Docters</h2>
            <div>Create an account with the doctor account type</div>
          </div>
          <div className={classNames.otherboxes}>
            <div>
              Effortlessly manage all patient records from the dashboard.
            </div>
            <div>
              Access comprehensive details and medical history of your clients'
              pets.
            </div>
            <div>
              Schedule automated vaccination notifications for clients with
              precision.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Procedure;
