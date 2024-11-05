"use client"
import { Icon } from "@iconify/react";
import { Menu } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { NavItemT, NavItemWithChildren, NavItemWithUrl } from "./constant";

export function NavItemDefault({ name, url }: NavItemWithUrl) {
  return (
    <Link className="nav-link px-2" href={url}>
      {name}
    </Link>
  );
}

export function NavItemMenu({
  name,
  subNavList,
  isChildren,
}: NavItemWithChildren & { isChildren?: boolean }) {
  return (
    <Menu
      offset={{
        mainAxis: isChildren ? 15 : 10,
      }}
      withArrow={isChildren ? true : false}
      shadow="md"
      width={200}
      position={isChildren ? "right" : "bottom"}
    >
      <Menu.Target>
        <div className="nav-drop-down with-icon">
          <div className={clsx("whitespace-nowrap", isChildren && "w-full")}>
            {name}
          </div>
          <Icon className="nav-drop-down-icon" icon="oui:arrow-down" />
        </div>
      </Menu.Target>
      <Menu.Dropdown className="p-3 grid gap-4">
        {subNavList?.map((navItem, index) => (
          <NavItem key={navItem.name + index} isChildren {...navItem} />
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
export function NavItemMenuMobile({
  name,
  subNavList,
  isChildren,
}: NavItemWithChildren & { isChildren?: boolean }) {
  const [active, setActive] = React.useState(false);

  return (
    <div>
      <div
        onClick={() => setActive(!active)}
        className={clsx(
          "nav-drop-down flex items-center justify-between p-2 rounded hover:bg-blue-100",
          active && "text-primary bg-blue-100"
        )}
      >
        <div
          className={clsx(
            "whitespace-nowrap select-none",
            isChildren && "w-full"
          )}
        >
          {name}
        </div>
        <Icon icon={active ? "oui:arrow-up" : "oui:arrow-down"} />
      </div>
      {active && (
        <div className="grid mt-2 ml-2 p-2 border-transparent border-solid border-l-2 border-l-blue-200">
          {subNavList?.map((navItem, index) => (
            <NavItem key={navItem.name + index} isChildren {...navItem} />
          ))}
        </div>
      )}
    </div>
  );
}
export function NavItem(props: NavItemT & { isChildren?: boolean }) {
  const { isChildren, ...navItem } = props;
  const { width } = useViewportSize();
  if (navItem?.subNavList) {
    if (width < 768)
      return (
        <NavItemMenuMobile
          key={navItem.name}
          name={navItem.name}
          subNavList={navItem.subNavList}
          isChildren={isChildren}
        />
      );
    else
      return (
        <NavItemMenu
          key={navItem.name}
          name={navItem.name}
          subNavList={navItem.subNavList}
          isChildren={isChildren}
        />
      );
  }
  return (
    <NavItemDefault key={navItem.name} name={navItem.name} url={navItem.url!} />
  );
}
