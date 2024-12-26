"use client";
import { Icon } from "@iconify/react";
import { Text, Title } from "@mantine/core";

import clsx from "clsx";
import CargoQuoteForm from "./forms/cargoQuoteForm";
import style from "./hero.module.scss";

export const LeftSection = () => {
  return (
    <section className="grid content-center justify-items-center gap-2 text-white">
      <div className="rounded-md border-white px-4 py-2 [border:2px_solid]">
        <Text>SHIPPING MADE SIMPLE</Text>
      </div>
      <Title
        order={1}
        className="text-center text-3xl font-bold leading-[1.1] md:text-4xl lg:!text-[54px]"
      >
        Save up to 60% on <br /> Parcel Delivery
      </Title>
      <div className="mt-4 flex gap-2">
        <Text className="with-icon text-nowrap !text-[12px] md:!text-[1rem]">
          <div className={clsx(style.checkboxContainer)}>
            <Icon
              color="white"
              className="text-[0.85rem] md:text-xl"
              icon="material-symbols:check"
            />
          </div>
          Easy Ordering
        </Text>
        <Text className="with-icon text-nowrap !text-[12px] md:!text-[1rem]">
          <div className={clsx(style.checkboxContainer)}>
            <Icon
              color="white"
              className="text-[0.85rem] md:text-xl"
              icon="material-symbols:check"
            />
          </div>
          Trusted Carriers
        </Text>
        <Text className="with-icon text-nowrap !text-[12px] md:!text-[1rem]">
          <div className={clsx(style.checkboxContainer)}>
            <Icon
              color="white"
              className="text-[0.85rem] md:text-xl"
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
      <div className="safe-area flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 bg-opacity-60 px-[24px]">
        <LeftSection />
        <CargoQuoteForm />
      </div>
    </article>
  );
};

export default HeroSection;
