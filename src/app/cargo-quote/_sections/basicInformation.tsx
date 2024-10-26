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
import { useGetAQuoteDataStore } from "@/store/quote/quote";
import { useShipmentStore } from "@/store/quote/shipment";
import { QuoteCountryResponseType, useQuoteSharedStore } from "@/store/quote/quoteSharedStore";

type QuoteForm = {
  pickupCountry?: QuoteCountryResponseType,
  deliveryCountry?: QuoteCountryResponseType
} & Pick<CargoQuoteForm, "type">



const BaseInformationSection = () => {
  const quoteDataStore = useGetAQuoteDataStore();
  const { quoteData: QUOTE_DATA } = quoteDataStore;
  const shipmentStore = useShipmentStore()
  const quoteSharedStore = useQuoteSharedStore();

  const [opened, { open, close }] = useDisclosure(false);
  // const [error, setError] = React.useState<cargoValidationResolveType>(null);


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
      const { country, region } = value;
      quoteSharedStore.setCountry("deliveryCountry", country!)
      quoteSharedStore.setCity("deliveryCity", country!)
      quoteSharedStore.setRegion("deliveryRegion", region!)

    }
    else if (key === "pickup") {
      const { country, region } = value;
      quoteSharedStore.setCountry("pickupCountry", country!)
      quoteSharedStore.setCity("pickupCity", country!)
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
            <CountryWithRegionSelect onChange={(d) => addressChangeHandler("pickup", d)}
            />
          </section>
          <section className="grid gap-3">
            <Text className="font-bold">Delivery To</Text>
            <CountryWithRegionSelect onChange={(d) => addressChangeHandler("delivery", d)}

            />
          </section>
          <Button type="submit">Update</Button>
        </form>
      </Modal>
      <div className="flex-1">
        {/*Error?.errorList && (
          <div className="grid gap-1">
            {
            
            error?.errorList?.map((item) => (
              <Alert
                key={item}
                variant="light"
                color="red"
                title="Alert title"
                icon={<Icon icon="clarity:error-solid" />}
              >
                {item}
              </Alert>
            ))
              }
          </div>
        )*/}
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
            {/*error?.envelopeErrorList && (
              <div className="grid gap-1">
                {error?.envelopeErrorList?.map((item) => (
                  <Alert
                    key={item}
                    variant="light"
                    color="red"
                    title={item}
                    icon={<Icon icon="clarity:error-solid" />}
                  ></Alert>
                ))}
              </div>
            )*/}
            {/* PACKAGE */}
            {QUOTE_DATA.parcels.packages.map((item, index) => (
              <CargoInput
                key={index + item.parcelId!}
                {...item}
                index={index}
                type="packages"
              />
            ))}
            {/*error?.packagesErrorList && (
              <div className="grid gap-1">
                {error?.packagesErrorList?.map((item) => (
                  <Alert
                    key={item}
                    variant="light"
                    color="red"
                    title={item}
                    icon={<Icon icon="clarity:error-solid" />}
                  ></Alert>
                ))}
              </div>
            )*/}
            {/* PALLET */}
            {QUOTE_DATA.parcels.pallets.map((item, index) => (
              <CargoInput
                key={index + item.parcelId!}
                {...item}
                index={index}
                type="pallets"
              />
            ))}
            {/*error?.palletsErrorList && (
              <div className="grid gap-1">
                {error?.palletsErrorList?.map((item) => (
                  <Alert
                    key={item}
                    variant="light"
                    color="red"
                    title={item}
                    icon={<Icon icon="clarity:error-solid" />}
                  ></Alert>
                ))}
              </div>
            )*/}
            <div className="grid gap-4 grid-cols-3">
              <Button
                leftSection={
                  <Icon
                    className="text-lg text-blue-500"
                    icon="rivet-icons:plus"
                  />
                }
                onClick={() => quoteDataStore.addParcel("envelopes")}
                className="text-gray-800"
                size="lg"
                variant="white"
              >
                Add Envelope
              </Button>
              <Button
                leftSection={
                  <Icon
                    className="text-lg text-blue-500"
                    icon="rivet-icons:plus"
                  />
                }
                onClick={() => quoteDataStore.addParcel("packages")}
                className="text-gray-800"
                size="lg"
                variant="white"
              >
                Add Package
              </Button>
              <Button
                leftSection={
                  <Icon
                    className="text-lg text-blue-500"
                    icon="rivet-icons:plus"
                  />
                }
                onClick={() => quoteDataStore.addParcel("pallets")}
                className="text-gray-800"
                size="lg"
                variant="white"
              >
                Add Pallet
              </Button>
            </div>
          </article>

          <section className="cargo-quote-section grid gap-4 ">
            <div className="grid gap-2">
              <Title order={3} className="font-semibold">
                Choose Shipping Options
              </Title>
            </div>
            <CheckboxCard className="rounded-xl shadow-sm">
              <div className="flex p-6 gap-6 items-start">
                <Checkbox.Indicator className="mt-1" radius="lg" size="md" />
                <div className="grid flex-1">
                  <div className="flex items-start justify-between">
                    <Text className="font-bold text-xl">Express</Text>
                    <div className="flex flex-col items-start">
                      <Text className="font-bold">€35</Text>
                      <Text className="text-xs text-gray-400 leading-none">
                        incl. VAT
                      </Text>
                    </div>
                  </div>
                  <Text className="text-gray-400 text-sm">
                    Choose an insurance to protect your order
                  </Text>
                </div>
              </div>
            </CheckboxCard>
          </section>
        </article>
      </div>
      <OrderSummerySection submitHandler={submitHandler} />
    </>
  );
};

export default BaseInformationSection;
