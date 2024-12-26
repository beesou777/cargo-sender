"use client";

import React from "react";
import { NavItemT } from "./constant";
import { NavItemDefault } from "./navItem";

export function Services(props: NavItemT & { isChildren?: boolean }) {
  const { isChildren, ...navItem } = props;
  return (
    <>
      <NavItemDefault
        key={navItem.name}
        name={navItem.name}
        url={navItem.url!}
        icons={navItem.icons}
        onClick={navItem.onClick}
      />
    </>
  );
}
