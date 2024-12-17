"use client";
import CargoInput from "@/components/inputs/cargo";
import CountrySelect, { countryType, LocationSelectValue } from "@/components/inputs/countySelect";
import { Icon } from "@iconify/react";
import {
  ActionIcon,
  Button,
  Modal,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { FormEvent } from "react";
import OrderSummerySection from "./orderSummery";
import { useGetAQuoteDataStore } from "@/store/quote/quote";
import { useShipmentStore } from "@/store/quote/shipment";
import { useQuoteSharedStore } from "@/store/quote/quoteSharedStore";
import { notifications } from '@mantine/notifications';


const BaseInformationSection = () => {
  const quoteDataStore = useGetAQuoteDataStore();
  const { quoteData: QUOTE_DATA } = quoteDataStore;
  const shipmentStore = useShipmentStore()
  const quoteSharedStore = useQuoteSharedStore();

  const { deliveryCountry: DELIVERY_COUNTRY, pickupCountry: PICKUP_COUNTRY } = quoteSharedStore


  const [opened, { open, close }] = useDisclosure(false);

  const countryFlags = {
    Collect: PICKUP_COUNTRY?.code
      ? `flagpack:${(
        PICKUP_COUNTRY?.code as string
      ).toLocaleLowerCase()}`
      : "carbon:flag-filled",
    Deliver: DELIVERY_COUNTRY?.code
      ? `flagpack:${(
        DELIVERY_COUNTRY?.code as string
      ).toLocaleLowerCase()}`
      : "carbon:flag-filled",
  };

  function submitHandler() {
    const { pallets, envelopes, packages } = QUOTE_DATA.parcels || {};

    // Case 1: Ignore pallets, envelopes, and packages if they're empty
    if (
      (!pallets || pallets.length === 0) &&
      (!envelopes || envelopes.length === 0) &&
      (!packages || packages.length === 0)
    ) {
      console.log("No parcels to process.");
      return false;
    }


    // Case 2: Check packages only if they exist and are not empty
    if (packages && packages.length > 0) {
      const areAllPackagesValid = packages.every((pkg) => {
        return (
          (pkg?.height ?? 0) > 0 &&
          (pkg?.length ?? 0) > 0 &&
          pkg?.parcelId &&
          pkg?.quantity > 0 &&
          (pkg?.value ?? 0) > 0 &&
          (pkg?.weight ?? 0) > 0 &&
          (pkg?.width ?? 0) > 0
        );
      });

      if (!areAllPackagesValid) {
        notifications.show({
          title: "Error",
          message: "All feild are required!!",
          color: "red",
        })
        return false;
      }
    }

    if (pallets && pallets.length > 0) {
      const areAllPalletsValid = pallets.every((pkg) => {
        return (
          (pkg?.height ?? 0) > 0 &&
          (pkg?.length ?? 0) > 0 &&
          pkg?.parcelId &&
          pkg?.quantity > 0 &&
          (pkg?.value ?? 0) > 0 &&
          (pkg?.weight ?? 0) > 0 &&
          (pkg?.width ?? 0) > 0
        );
      });

      if (!areAllPalletsValid) {
        notifications.show({
          title: "Error",
          message: "All feild are required!!",
          color: "red",
        })
        return false;
      }
    }

    if (envelopes && envelopes.length > 0) {
      const areAllEnvelopesValid = envelopes.every((pkg) => {
        return (
          pkg?.parcelId &&
          pkg?.quantity > 0 &&
          (pkg?.weight ?? 0) > 0
        );
      });
      if (!areAllEnvelopesValid) {
        notifications.show({
          title: "Error",
          message: "All feild are required!!",
          color: "red",
        })
        return false;
      }
    }

    return true;
  }



  const addressChangeHandler = (key: "delivery" | "pickup", country: countryType) => {

    if (key === "delivery") {
      quoteSharedStore.setCountry("deliveryCountry", country!)

    }
    else if (key === "pickup") {
      quoteSharedStore.setCountry("pickupCountry", country!)
    }
  }

  const modelSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    quoteDataStore.resetParcels()
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
            <CountrySelect value={pickupAddress.country} onChange={(d) => addressChangeHandler("pickup", d)}
            />
          </section>
          <section className="grid gap-3">
            <Text className="font-bold">Delivery To</Text>
            <CountrySelect value={deliveryAddress.country} onChange={(d) => addressChangeHandler("delivery", d)}

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
                    {(PICKUP_COUNTRY?.code as string) || "Unknown"}
                    <span className="font-light text-gray-600 mx-1">
                      (
                      {(PICKUP_COUNTRY?.name as string) ||
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
                    {(DELIVERY_COUNTRY?.code as string) || "Unknown"}
                    <span className="font-light text-gray-600 mx-1">
                      (
                      {(DELIVERY_COUNTRY?.name as string) || "Unknown"}
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
        </article >
      </div >
      <OrderSummerySection submitHandler={submitHandler} />
    </>
  );
};

export default BaseInformationSection;
