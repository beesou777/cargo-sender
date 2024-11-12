"use client";
import { Icon } from "@iconify/react";
import { Title } from "@mantine/core";

import clsx from "clsx";
import CargoQuoteForm from "./forms/cargoQuoteForm";
import style from "./hero.module.scss";

export const LeftSection = () => {
  return (
    <section className="grid gap-2 justify-items-start content-center text-white">
      <span className="p-2 bg-gray-900 rounded-lg">
        <div className="with-icon">
          Rate 4.8/5 on
          <Icon className="text-green-600" icon="simple-icons:trustpilot" />
          Trustpilot
        </div>
      </span>
      <Title className="h1">
        Save on Global shipping with CargoSender
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
    </section>
  );
};

const HeroSection = () => {
  return (
    <article className={clsx("pb-10", "heroBg")}>
      <div className="max-w-[1450px] mx-auto px-[10px] grid lg:grid-cols-2 align-middle bg-opacity-60 min-h-[calc(100vh-3rem)]">
        <LeftSection />
        <div className="grid justify-items-start content-center">
          <CargoQuoteForm />
        </div>
      </div>
    </article>
  );
};

export default HeroSection;
