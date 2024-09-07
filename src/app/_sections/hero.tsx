"use client";
import RadioButtonContainer from "@/components/inputs/buttonRadio";
import { Icon } from "@iconify/react";
import { Button, Popover, Select, Text, Title } from "@mantine/core";

import clsx from "clsx";
import style from "./hero.module.scss";

const HeroSection = () => {
  return (
    <article className={clsx("pb-10", style.heroBg)}>
      <div className="safe-area grid grid-cols-2 align-middle gap-4 bg-opacity-60 min-h-[calc(100vh-5rem)]">
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
              <div className="flex size-5 items-center justify-center bg-orange-50 text-secondary rounded">
                <Icon className="text-xl" icon="material-symbols:check" />
              </div>
              Easy Ordering
            </span>
            <span className="with-icon">
              <div className="flex size-5 items-center justify-center bg-orange-50 text-secondary rounded">
                <Icon className="text-xl" icon="material-symbols:check" />
              </div>
              Trusted Carriers
            </span>
            <span className="with-icon">
              <div className="flex size-5 items-center justify-center bg-orange-50 text-secondary rounded">
                <Icon className="text-xl" icon="material-symbols:check" />
              </div>
              Same day response
            </span>
          </div>
        </div>
        <div className="grid justify-items-start content-center">
          <form className="bg-white rounded-2xl p-8 m-4 grid gap-6" action="">
            <section className="grid gap-3">
              <Text className="font-bold">Collect From</Text>
              <div className="flex gap-4">
                <Select className="w-2/6"></Select>
                <Select className="w-4/6" searchable></Select>
              </div>
            </section>
            <section className="grid gap-3">
              <Text className="font-bold">Delivery To</Text>
              <div className="flex gap-4">
                <Select className="w-2/6"></Select>
                <Select className="w-4/6" searchable></Select>
              </div>
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
                  <Popover.Dropdown>
                    Lorem ipsum dolor sit amet.
                  </Popover.Dropdown>
                </Popover>
              </div>
              <RadioButtonContainer
                options={[
                  { label: "Documents", value: "documents" },
                  { label: "Box", value: "box" },
                  { label: "Pallet", value: "pallet" },
                ]}
              />
            </section>
            <Button color="yellow" className="text-black mt-4">
              Get a quote
            </Button>
          </form>
        </div>
      </div>
    </article>
  );
};

export default HeroSection;
