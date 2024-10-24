"use client";
import { CargoQuoteForm } from "@/app/_sections/forms/cargoQuoteForm";
import CargoInput from "@/components/inputs/cargo";
import CountryWithRegionSelect from "@/components/inputs/countySelect";
import { cargoValidationResolveType, useCargoStore } from "@/store/cargo";
import { Icon } from "@iconify/react";
import {
  ActionIcon,
  Alert,
  Button,
  Checkbox,
  CheckboxCard,
  Modal,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import OrderSummerySection from "./orderSummery";

const BaseInformationSection = () => {
  const cargoStore = useCargoStore();
  const { parcels: cargo } = cargoStore;
  const [opended, { open, close }] = useDisclosure(false);
  const [error, setError] = React.useState<cargoValidationResolveType>(null);
  const quoteForm = useForm<Omit<CargoQuoteForm, "type">>({
    initialValues: {
      collectFrom: cargoStore.parcels.shipment?.pickupAddress || undefined,
      deliveryTo: cargoStore.parcels.shipment?.deliveryAddress || undefined,
    },
    validate: {
      collectFrom: (v) => (v ? null : "This field is required"),
      deliveryTo: (v) => (v ? null : "This field is required"),
    },
  });

  const countryFlags = {
    Collect: cargo.shipment?.pickupAddress?.country?.code
      ? `flagpack:${(
        cargo.shipment?.pickupAddress.country.code as string
      ).toLocaleLowerCase()}`
      : "carbon:flag-filled",
    Deliver: cargo.shipment?.deliveryAddress?.country?.code
      ? `flagpack:${(
        cargo.shipment?.deliveryAddress.country.code as string
      ).toLocaleLowerCase()}`
      : "carbon:flag-filled",
  };

  function submitHandler() {
    const err = cargoStore.validateData();
    setError(err);

    console.log(cargoStore.parcels);
    console.log(err);

    if (err) return false;
    else return true;
  }

  const modelSubmitHandler = (data: Omit<CargoQuoteForm, "type">) => {
    if (!data) return;
    if (!cargoStore) return;
    cargoStore.parcels?.pickupAddress &&
      cargoStore.parcels?.pickupAddress(data.collectFrom!);
    cargoStore.parcels?.deliveryAddress &&
      cargoStore.parcels?.deliveryAddress(data.deliveryTo!);

    close();
  };

  return (
    <>
      {/* Model */}
      <Modal title="Update Delivery" opened={opended} onClose={close}>
        <form
          onSubmit={quoteForm.onSubmit(modelSubmitHandler)}
          className="grid gap-6"
          action=""
        >
          <section className="grid gap-3">
            <Text className="font-bold">Collect From</Text>
            <CountryWithRegionSelect
              {...quoteForm.getInputProps("collectFrom")}
            />
          </section>
          <section className="grid gap-3">
            <Text className="font-bold">Delivery To</Text>
            <CountryWithRegionSelect
              {...quoteForm.getInputProps("deliveryTo")}
            />
          </section>
          <Button type="submit">Update</Button>
        </form>
      </Modal>
      <div className="flex-1">
        {error?.errorList && (
          <div className="grid gap-1">
            {error?.errorList?.map((item) => (
              <Alert
                key={item}
                variant="light"
                color="red"
                title="Alert title"
                icon={<Icon icon="clarity:error-solid" />}
              >
                {item}
              </Alert>
            ))}
          </div>
        )}
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
                    {(cargo.shipment?.pickupAddress?.country.name as string) || "Unknown"}
                    <span className="font-light text-gray-600 mx-1">
                      (
                      {(cargo.shipment?.pickupAddress?.location.name as string) ||
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
                    {(cargo.shipment?.deliveryAddress?.country.name as string) || "Unknown"}
                    <span className="font-light text-gray-600 mx-1">
                      (
                      {(cargo.shipment?.deliveryAddress?.location.name as string) || "Unknown"}
                      )
                    </span>
                  </Text>
                </div>
              </div>
            </div>
          </section>

          <article className="grid gap-4">
            {/* PACKAGE */}
            {cargo.envelopes.map((item, index) => (
              <CargoInput
                key={item.length + index + item.height}
                {...item}
                index={index}
                type="Envelope"
              />
            ))}
            {error?.envelopeErrorList && (
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
            )}
            {/* PACKAGE */}
            {cargo.packages.map((item, index) => (
              <CargoInput
                key={item.length + index + item.height}
                {...item}
                index={index}
                type="Package"
              />
            ))}
            {error?.packagesErrorList && (
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
            )}
            {/* PALLET */}
            {cargo.pallets.map((item, index) => (
              <CargoInput
                key={item.length + index + item.height}
                {...item}
                index={index}
                type="Pallet"
              />
            ))}
            {error?.palletsErrorList && (
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
            )}
            <div className="grid gap-4 grid-cols-3">
              <Button
                leftSection={
                  <Icon
                    className="text-lg text-blue-500"
                    icon="rivet-icons:plus"
                  />
                }
                onClick={cargoStore.addEnvelope}
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
                onClick={cargoStore.addPackage}
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
                onClick={cargoStore.addPallet}
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
