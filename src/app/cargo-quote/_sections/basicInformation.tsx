"use client";
import { CargoQuoteForm } from "@/app/_sections/forms/cargoQuoteForm";
import CargoInput from "@/components/inputs/cargo";
import CountryWithRegionSelect, { LocationSelectValue } from "@/components/inputs/countySelect";
import { Icon } from "@iconify/react";
import {
  ActionIcon,
  Button,
  Checkbox,
  CheckboxCard,
  Modal,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { FormEvent } from "react";
import OrderSummerySection from "./orderSummery";
import { serviceTypes, useGetAQuoteDataStore } from "@/store/quote/quote";
import { useShipmentStore } from "@/store/quote/shipment";
import { QuoteCountryResponseType, useQuoteSharedStore } from "@/store/quote/quoteSharedStore";
import { snakeCaseToString } from "@/utils/strings";


const BaseInformationSection = () => {
  const quoteDataStore = useGetAQuoteDataStore();
  const { quoteData: QUOTE_DATA } = quoteDataStore;
  const shipmentStore = useShipmentStore()
  const quoteSharedStore = useQuoteSharedStore();

  const [opened, { open, close }] = useDisclosure(false);

  const countryFlags = {
    Collect: shipmentStore.shipment?.pickupAddress?.country
      ? `flagpack:${(
        shipmentStore.shipment?.pickupAddress.country as string
      ).toLocaleLowerCase()}`
      : "carbon:flag-filled",
    Deliver: shipmentStore.shipment?.deliveryAddress?.country
      ? `flagpack:${(
        shipmentStore.shipment?.deliveryAddress.country as string
      ).toLocaleLowerCase()}`
      : "carbon:flag-filled",
  };

  function submitHandler() {
    return true
  }

  const addressChangeHandler = (key: "delivery" | "pickup", value: LocationSelectValue) => {

    if (key === "delivery") {
      const { city, country, region } = value;
      quoteSharedStore.setCountry("deliveryCountry", country!)
      quoteSharedStore.setCity("deliveryCity", city!)
      quoteSharedStore.setRegion("deliveryRegion", region!)

    }
    else if (key === "pickup") {
      const { city, country, region } = value;
      quoteSharedStore.setCountry("pickupCountry", country!)
      quoteSharedStore.setCity("pickupCity", city!)
      quoteSharedStore.setRegion("pickupRegion", region!)
    }
  }

  const modelSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { delivery, pickup } = quoteSharedStore.getLocations()
    const deliveryAddress = shipmentStore.mapLocationToShipmentAddress(delivery)
    const pickupAddress = shipmentStore.mapLocationToShipmentAddress(pickup)
    shipmentStore.setShipmentAddress("deliveryAddress", deliveryAddress)
    shipmentStore.setShipmentAddress("pickupAddress", pickupAddress)
    close();
  };

  const pickupAddress = quoteSharedStore.getLocations().pickup
  const deliveryAddress = quoteSharedStore.getLocations().delivery
  return (
    <>
      {/* Model */}
      <Modal title="Update Delivery" opened={opened} onClose={close}>
        <form
          onSubmit={modelSubmitHandler}
          className="grid gap-6"
          action=""
        >
          <section className="grid gap-3">
            <Text className="font-bold">Collect From</Text>
            <CountryWithRegionSelect value={pickupAddress} onChange={(d) => addressChangeHandler("pickup", d)}
            />
          </section>
          <section className="grid gap-3">
            <Text className="font-bold">Delivery To</Text>
            <CountryWithRegionSelect value={deliveryAddress} onChange={(d) => addressChangeHandler("delivery", d)}

            />
          </section>
          <Button type="submit">Update</Button>
        </form>
      </Modal>

      <div className="flex-1">
        <article className="grid gap-8">
          <section className="cargo-quote-section grid gap-4">
            <div className="flex justify-between gap-4">
              <Title order={3} className="font-semibold">
                Delivery
              </Title>
              <ActionIcon onClick={open} radius="lg" variant="light">
                <Icon icon="material-symbols:edit" />
              </ActionIcon>
            </div>

            <div className="grid gap-4 grid-cols-2">
              <div>
                <Text>Collect From</Text>
                <div className="with-icon mt-2">
                  <Icon className="text-xl" icon={countryFlags.Collect} />
                  <Text className="font-semibold">
                    {(shipmentStore.shipment?.pickupAddress?.country as string) || "Unknown"}
                    <span className="font-light text-gray-600 mx-1">
                      (
                      {(shipmentStore.shipment?.pickupAddress?.region as string) ||
                        "Unknown"}
                      )
                    </span>
                  </Text>
                </div>
              </div>
              <div>
                <Text>Deliver To</Text>
                <div className="with-icon mt-2">
                  <Icon className="text-xl" icon={countryFlags.Deliver} />
                  <Text className="font-semibold">
                    {(shipmentStore.shipment?.deliveryAddress?.country as string) || "Unknown"}
                    <span className="font-light text-gray-600 mx-1">
                      (
                      {(shipmentStore.shipment?.deliveryAddress?.region as string) || "Unknown"}
                      )
                    </span>
                  </Text>
                </div>
              </div>
            </div>
          </section>

          <article className="grid gap-4">
            {/* ENVELOPES */}
            {QUOTE_DATA.parcels.envelopes.map((item, index) => (
              <CargoInput
                key={index + item.parcelId!}
                index={index}
                {...item}
                type={"envelopes"}
              />
            ))}
            {/* PACKAGE */}
            {QUOTE_DATA.parcels.packages.map((item, index) => (
              <CargoInput
                key={index + item.parcelId!}
                {...item}
                index={index}
                type="packages"
              />
            ))}
            {/* PALLET */}
            {QUOTE_DATA.parcels.pallets.map((item, index) => (
              <CargoInput
                key={index + item.parcelId!}
                {...item}
                index={index}
                type="pallets"
              />
            ))}
            <div className="grid gap-8 grid-cols-3 mt-4">
              <Button
                radius="md"
                leftSection={
                  <Icon
                    className="text-lg text-blue-500"
                    icon="rivet-icons:plus"
                  />
                }
                onClick={() => quoteDataStore.addParcel("envelopes")}
                className="text-gray-800"
                variant="white"
              >
                Add Envelope
              </Button>
              <Button
                radius="md"
                leftSection={
                  <Icon
                    className="text-lg text-blue-500"
                    icon="rivet-icons:plus"
                  />
                }
                onClick={() => quoteDataStore.addParcel("packages")}
                className="text-gray-800"
                variant="white"
              >
                Add Package
              </Button>
              <Button
                radius="md"
                leftSection={
                  <Icon
                    className="text-lg text-blue-500"
                    icon="rivet-icons:plus"
                  />
                }
                onClick={() => quoteDataStore.addParcel("pallets")}
                className="text-gray-800"
                variant="white"
              >
                Add Pallet
              </Button>
            </div>
          </article >

          <section className="cargo-quote-section grid gap-4 ">
            <div className="grid gap-2">
              <Title order={3} className="font-semibold">
                Choose Shipping Options
              </Title>
            </div>
            {serviceTypes.map(service => <CheckboxCard key="service-type" className="rounded-lg shadow-sm">
              <div tabIndex={0} onClick={() => quoteDataStore.updateServiceType(service.service)} className="flex p-6 gap-4 items-center">
                <Checkbox.Indicator checked={quoteDataStore.quoteData.serviceType === service.service} className="mt-1" radius="lg" size="md" />
                <div className="grid flex-1">
                  <Text className="font-bold text-lg">{service.name}</Text>


                </div>
              </div>
            </CheckboxCard>)}
          </section>
        </article >
      </div >
      <OrderSummerySection submitHandler={submitHandler} />
    </>
  );
};

export default BaseInformationSection;
