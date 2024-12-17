"use client";
import { Stepper } from "@mantine/core";
import { useQuoteSharedStore } from "@/store/quote/quoteSharedStore";
import { useShipmentStore } from "@/store/quote/shipment";
import { useSteeper } from "@/store/step";
import AddressSection from "./_sections/address";
import BaseInformationSection from "./_sections/basicInformation";
import InsuranceSection from "./_sections/insurance";
import PaymentSection from "./_sections/payment";
import React from "react";
import WarningsSections from "./_sections/warnings";

import "./style.scss";

const CARGO_SECTION_LIST = [
  <BaseInformationSection key="cargo-form-1" />,
  <AddressSection key="cargo-form-2" />,
  <InsuranceSection key="cargo-form-3" />,
  <PaymentSection key="cargo-form-4" />,
];

const CargoQuote = () => {
  const { activeStep, setStep } = useSteeper();

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

  return (
    <main className="bg-backdrop m-0">
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
      <article className="safe-area py-8 grid lg:flex gap-8 items-start">
        {CARGO_SECTION_LIST[activeStep]}
      </article>
      <WarningsSections />
    </main>
  );
};

export default CargoQuote;
