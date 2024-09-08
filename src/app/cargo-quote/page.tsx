"use client";

import { Stepper } from "@mantine/core";
import { useState } from "react";

import AddressSection from "./_sections/address";
import BaseInformationSection from "./_sections/basicInformation";
import InsuranceSection from "./_sections/insurance";
import OrderSummerySection from "./_sections/orderSummery";
import PaymentSection from "./_sections/payment";
import "./style.scss";

const FormList = [
  <BaseInformationSection key="cargo-form-1" />,
  <AddressSection key="cargo-form-2" />,
  <InsuranceSection key="cargo-form-3" />,
  <PaymentSection key="cargo-form-4" />,
];

const CargoQuote = () => {
  const [active, setActive] = useState(1);

  return (
    <main>
      <section className="bg-white stepper-container">
        <div className="safe-area">
          <Stepper
            color="blue.5"
            size="xs"
            active={active}
            onStepClick={setActive}
          >
            <Stepper.Step label="Basic Information" />
            <Stepper.Step label="PickPickup and Delivery Address" />
            <Stepper.Step label="Insurance and Flexibility" />
            <Stepper.Step label="Payment" />
          </Stepper>
        </div>
      </section>
      <article className="safe-area my-14 flex gap-8 items-start">
        <div className="flex-1 cargo-quote-section">{FormList[active]}</div>
        <OrderSummerySection />
      </article>
    </main>
  );
};

export default CargoQuote;
