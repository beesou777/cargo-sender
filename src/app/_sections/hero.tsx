"use client";
import RadioButtonContainer from "@/components/inputs/buttonRadio";
import { Icon } from "@iconify/react";
import { Button, Popover, Text, Title } from "@mantine/core";

import CountryWithRegionSelect from "@/components/inputs/countySelect";
import { cargoTypes, LocationT, useCargoStore } from "@/store/cargo";
import { useForm } from "@mantine/form";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import style from "./hero.module.scss";

type CargoQuoteForm = {
  collectFrom?: LocationT;
  deliveryTo?: LocationT;
  type: cargoTypes;
};

const CargoQuoteForm = () => {
  const router = useRouter();
  const cargoStore = useCargoStore();
  const quoteForm = useForm<CargoQuoteForm>({
    validate: {
      type: (v) => (v ? null : "This field is required"),
      collectFrom: (v) => (v ? null : "This field is required"),
      deliveryTo: (v) => (v ? null : "This field is required"),
    },
  });

  const submitHandler = (data: CargoQuoteForm) => {
    if (!data) return;
    if (!cargoStore) return;
    cargoStore.updateCollectFrom &&
      cargoStore.updateCollectFrom(data.collectFrom!);
    cargoStore.updateDeliveryTo &&
      cargoStore.updateDeliveryTo(data.deliveryTo!);
    if (data.type === "Package")
      cargoStore.addPackage && cargoStore.addPackage();
    else if (data.type === "Pallet")
      cargoStore.addPallet && cargoStore.addPallet();
    router.push("/cargo-quote");
  };
  return (
    <form
      onSubmit={quoteForm.onSubmit(submitHandler)}
      className="bg-white rounded-2xl p-8 m-4 grid gap-6"
      action=""
    >
      <section className="grid gap-3">
        <Text className="font-bold">Collect From</Text>
        <CountryWithRegionSelect {...quoteForm.getInputProps("collectFrom")} />
      </section>
      <section className="grid gap-3">
        <Text className="font-bold">Delivery To</Text>
        <CountryWithRegionSelect {...quoteForm.getInputProps("deliveryTo")} />
      </section>

      <section className="grid gap-3">
        <div className="flex justify-between items-center">
          <Text className="font-bold">Choose a service</Text>
          <Popover shadow="md">
            <Popover.Target>
              <Icon
                className="text-xl text-gray-500"
                icon="mdi:about-circle-outline"
              />
            </Popover.Target>
            <Popover.Dropdown>Select a service type.</Popover.Dropdown>
          </Popover>
        </div>
        <RadioButtonContainer
          options={[
            { label: "Documents", value: "package" },
            { label: "Box", value: "box" },
            { label: "Pallet", value: "pallet" },
          ]}
          {...quoteForm.getInputProps("type")}
        />
      </section>
      <Button type="submit" color="yellow.4" className="mt-4 text-black">
        Get a quote
      </Button>
    </form>
  );
};

const HeroSection = () => {
  return (
    <article className={clsx("pb-10", style.heroBg)}>
      <div className="safe-area grid sm:grid-cols-2 align-middle gap-4 bg-opacity-60 min-h-[calc(100vh-3rem)]">
        <div className="grid gap-2 justify-items-start content-center text-white">
          <span className="p-2 bg-gray-900 rounded-lg">
            <div className="with-icon">
              Rate 4.8/5 on
              <Icon className="text-green-600" icon="simple-icons:trustpilot" />
              Trustpilot
            </div>
          </span>
          <Title className="text-6xl">
            Save on Global shipping with BetterSender
          </Title>
          <div className="grid gap-2 mt-4">
            <span className="with-icon">
              <div className={clsx(style.checkboxContainer, "text-secondary")}>
                <Icon className="text-xl" icon="material-symbols:check" />
              </div>
              Easy Ordering
            </span>
            <span className="with-icon">
              <div className={clsx(style.checkboxContainer, "text-secondary")}>
                <Icon className="text-xl" icon="material-symbols:check" />
              </div>
              Trusted Carriers
            </span>
            <span className="with-icon">
              <div className={clsx(style.checkboxContainer, "text-secondary")}>
                <Icon className="text-xl" icon="material-symbols:check" />
              </div>
              Same day response
            </span>
          </div>
        </div>
        <div className="grid justify-items-start content-center">
          <CargoQuoteForm />
        </div>
      </div>
    </article>
  );
};

export default HeroSection;
