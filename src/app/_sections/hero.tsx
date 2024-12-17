"use client";
import { Icon } from "@iconify/react";
import { Text, Title } from "@mantine/core";

import clsx from "clsx";
import CargoQuoteForm from "./forms/cargoQuoteForm";
import style from "./hero.module.scss";

export const LeftSection = () => {
  return (
    <section className="grid gap-2 justify-items-center content-center text-white">
      <div className="px-4 py-2 [border:2px_solid] border-white rounded-md">
        <Text>SHIPPING MADE SIMPLE</Text>
      </div>
      <Title
        order={1}
        className="lg:!text-[54px] text-center leading-[1.1] font-bold md:text-4xl text-3xl"
      >
        Save up to 60% on <br /> Parcel Delivery
      </Title>
      <div className="flex gap-2 mt-4">
        <Text className="with-icon !text-[12px] md:!text-[1rem] text-nowrap">
          <div className={clsx(style.checkboxContainer)}>
            <Icon
              color="white"
              className="md:text-xl text-[0.85rem]"
              icon="material-symbols:check"
            />
          </div>
          Easy Ordering
        </Text>
        <Text className="with-icon !text-[12px] md:!text-[1rem] text-nowrap">
          <div className={clsx(style.checkboxContainer)}>
            <Icon
              color="white"
              className="md:text-xl text-[0.85rem]"
              icon="material-symbols:check"
            />
          </div>
          Trusted Carriers
        </Text>
        <Text className="with-icon !text-[12px] md:!text-[1rem] text-nowrap">
          <div className={clsx(style.checkboxContainer)}>
            <Icon
              color="white"
              className="md:text-xl text-[0.85rem]"
              icon="material-symbols:check"
            />
          </div>
          Same day response
        </Text>
      </div>
    </section>
  );
};

const HeroSection = () => {
  return (
    <article className={clsx("heroBg")}>
      <div className="px-[24px] safe-area bg-opacity-60 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-8">
        <LeftSection />
        <CargoQuoteForm />
      </div>
    </article>
  );
};

export default HeroSection;
