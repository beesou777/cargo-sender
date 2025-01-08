"use client";
import { Stepper } from "@mantine/core";
import { useQuoteSharedStore } from "@/store/quote/quoteSharedStore";
import { useShipmentStore } from "@/store/quote/shipment";
import { useSteeper } from "@/store/step";
import AddressSection from "./_sections/address";
import BaseInformationSection from "./_sections/basicInformation";
import InsuranceSection from "./_sections/insurance";
import PaymentSection from "./_sections/payment";
import WarningsSections from "./_sections/warnings";
import React, { useState } from "react";
import "./style.scss";

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
  const { activeStep, setStep } = useSteeper();
  const [highestStepVisited, setHighestStepVisited] = useState(activeStep);
  const quoteSharedStore = useQuoteSharedStore();
  const shipmentStore = useShipmentStore();

  React.useEffect(() => {
    if (localStorage) {
      if (
        shipmentStore.shipment.deliveryAddress.zip &&
        shipmentStore.shipment.pickupAddress.zip
      )
        return;

      if (
        quoteSharedStore.deliveryCountry?.code ||
        quoteSharedStore.pickupCountry?.code
      ) {
        const { delivery, pickup } = quoteSharedStore.getLocations();
        const deliveryAddress =
          shipmentStore.mapLocationToShipmentAddress(delivery);
        const pickupAddress =
          shipmentStore.mapLocationToShipmentAddress(pickup);
        shipmentStore.setShipmentAddress("deliveryAddress", deliveryAddress);
        shipmentStore.setShipmentAddress("pickupAddress", pickupAddress);
      }
    }
  }, []);

  const shouldAllowSelectStep = (step: number) =>
    highestStepVisited >= step && activeStep !== step;
  return (
    <main className="m-0 bg-backdrop">
      <section className="stepper-container sticky top-0 z-30 bg-white shadow-sm">
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
      <article className="safe-area grid items-start gap-8 py-8 lg:flex">
        {CARGO_SECTION_LIST[activeStep].component}
      </article>
      <WarningsSections />
    </main>
  );
};

export default CargoQuote;
