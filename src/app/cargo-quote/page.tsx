"use client";
import { Stepper } from "@mantine/core";
import AddressSection from "./_sections/address";
import BaseInformationSection, {
  getEmptyEntry,
} from "./_sections/basicInformation";
import InsuranceSection from "./_sections/insurance";
import PaymentSection from "./_sections/payment";
import WarningsSections from "./_sections/warnings";
import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { zodResolver } from "@mantine/form";
import { defaultValues } from "./form/default-values";
import { QuoteApiSchema } from "../api/orders/zod";
import { FormProvider, useForm } from "./form/form-context";

import { useSearchParams } from "next/navigation";

const CARGO_SECTION_LIST = [
  {
    key: "basic-information",
    label: "Basic Information",
    component: <BaseInformationSection />,
  },
  {
    key: "address",
    label: "Pickup and Delivery Address",
    component: <AddressSection />,
  },
  {
    key: "insurance",
    label: "Insurance and Flexibility",
    component: <InsuranceSection />,
  },
  {
    key: "payment",
    label: "Payment",
    component: <PaymentSection />,
  },
] as const;

const CargoQuote = () => {
  const [activeStep, setStep] = useState(0);
  const [highestStepVisited, setHighestStepVisited] = useState(activeStep);

  const shouldAllowSelectStep = (step: number) =>
    highestStepVisited >= step && activeStep !== step;
  const params = useSearchParams();

  const form = useForm({
    initialValues: defaultValues,
    validate: zodResolver(QuoteApiSchema),
  });

  useEffect(() => {
    form.setFieldValue("shipment.pickupAddress.country", params.get("from"));
    form.setFieldValue("shipment.deliveryAddress.country", params.get("to"));

    const type = params.get("type");
    if (type === "envelopes") {
      form.setFieldValue("parcels.envelops", [getEmptyEntry("envelopes")]);
    } else {
      form.setFieldValue(`parcels.${type}`, [getEmptyEntry("packages")]);
    }
  }, []);

  return (
    <main className="m-0 bg-backdrop">
      <section className="stepper-container bg-white">
        <div className="safe-area">
          <Stepper
            color="indigo.4"
            size="xs"
            active={activeStep}
            onStepClick={setStep}
          >
            {CARGO_SECTION_LIST.map((section, index) => (
              <Stepper.Step
                key={section.key}
                label={section.label}
                allowStepSelect={shouldAllowSelectStep(index)}
              />
            ))}
          </Stepper>
        </div>
      </section>
      <FormProvider form={form}>
        <article className="safe-area grid items-start gap-8 py-8 lg:flex">
          {CARGO_SECTION_LIST[activeStep]?.component}
        </article>
      </FormProvider>
      <WarningsSections />
    </main>
  );
};

export default CargoQuote;
