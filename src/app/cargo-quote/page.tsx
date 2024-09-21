"use client";

import { useSteeper } from "@/store/step";
import { Stepper } from "@mantine/core";
import AddressSection from "./_sections/address";
import BaseInformationSection from "./_sections/basicInformation";
import InsuranceSection from "./_sections/insurance";
import PaymentSection from "./_sections/payment";

import "./style.scss";

const CARGO_SECTION_LIST = [
  <BaseInformationSection key="cargo-form-1" />,
  <AddressSection key="cargo-form-2" />,
  <InsuranceSection key="cargo-form-3" />,
  <PaymentSection key="cargo-form-4" />,
];

const CargoQuote = () => {
  const { activeStep, setStep } = useSteeper();

  return (
    <main>
      <section className="bg-white stepper-container">
        <div className="safe-area">
          <Stepper
            color="indigo.4"
            size="xs"
            active={activeStep}
            onStepClick={setStep}
          >
            <Stepper.Step label="Basic Information" />
            <Stepper.Step label="PickPickup and Delivery Address" />
            <Stepper.Step label="Insurance and Flexibility" />
            <Stepper.Step label="Payment" />
          </Stepper>
        </div>
      </section>
      <article className="safe-area my-14 grid lg:flex gap-8 items-start">
        {CARGO_SECTION_LIST[activeStep]}
      </article>
    </main>
  );
};

export default CargoQuote;
