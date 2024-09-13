"use client";
import CargoInput from "@/components/inputs/cargo";
import { cargoValidationResolveType, useCargoStore } from "@/store/cargo";
import { countryCodesFromCountryName } from "@/utils/country";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Alert,
  Button,
  Checkbox,
  CheckboxCard,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import OrderSummerySection from "./orderSummery";

const BaseInformationSection = () => {
  const cargoStore = useCargoStore();
  const { cargo } = cargoStore;
  const [error, setError] = React.useState<cargoValidationResolveType>(null);

  const countryFlags = {
    Collect: cargo.collectFrom?.country
      ? `flagpack:${countryCodesFromCountryName[
          cargo.collectFrom?.country!
        ]?.toLocaleLowerCase()}`
      : "carbon:flag-filled",
    Deliver: cargo.deliveryTo?.country
      ? `flagpack:${countryCodesFromCountryName[
          cargo.deliveryTo?.country!
        ]?.toLocaleLowerCase()}`
      : "carbon:flag-filled",
  };

  function submitHandler() {
    const err = cargoStore.validateData();
    setError(err);
    console.log(cargoStore.cargo);

    console.log(err);
    if (err) return false;
    else return true;
  }

  return (
    <>
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
          <section className="cargo-quote-section grid gap-4 ">
            <Title order={3} className="font-semibold">
              Delivery
            </Title>
            <div className="grid gap-4 grid-cols-2">
              <div>
                <Text>Collect From</Text>
                <div className="with-icon mt-2">
                  <Icon className="text-xl" icon={countryFlags.Collect} />
                  <Text className="font-semibold">
                    {cargoStore.cargo.collectFrom?.country}
                  </Text>
                </div>
              </div>
              <div>
                <Text>Deliver To</Text>
                <div className="with-icon mt-2">
                  <Icon className="text-xl" icon={countryFlags.Deliver} />
                  <Text className="font-semibold">
                    {cargo.deliveryTo?.country}
                  </Text>
                </div>
              </div>
            </div>
          </section>
          <div className="grid gap-4">
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
            <div className="grid gap-4 grid-cols-2">
              <Button
                leftSection={
                  <Icon
                    className="text-xl text-blue-500"
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
                    className="text-xl text-blue-500"
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
          </div>
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
