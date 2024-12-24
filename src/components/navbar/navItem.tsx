"use client";
import { Icon } from "@iconify/react";
import { Menu, ThemeIcon, Text, Divider } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import clsx from "clsx";
import React from "react";
import { NavItemT, NavItemWithChildren, NavItemWithUrl } from "./constant";
import Link from "next/link";
import { Services } from "./Services";
import { IconArrowNarrowLeft } from "@tabler/icons-react";

export function NavItemDefault({
  name,
  url,
  icons: Icon,
  onClick,
}: NavItemWithUrl) {
  return (
    <Link
      onClick={(e) => {
        onClick?.();
      }}
      href={url}
      className="nav-link group flex items-center hover:bg-[#F3F6FB] py-2 !px-0 text-gray-950 !font-normal hover:!text-gray-950"
    >
      {Icon && (
        <ThemeIcon
          className="group-hover:!bg-blue-500 group-hover:!text-white mr-2 duration-300"
          size="lg"
          variant="light"
        >
          <Icon />
        </ThemeIcon>
      )}
      {name}
    </Link>
  );
}

export function NavItemMenu({
  name,
  subNavList,
  isChildren,
  onClick,
}: NavItemWithChildren & { isChildren?: boolean; onClick?: () => void }) {
  const [opened, setOpened] = React.useState(false);
  return (
    <Menu
    opened={opened}
      onChange={setOpened} 
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
      <Menu.Dropdown className="p-3 grid !w-fit">
        {subNavList?.map((navItem, index) => (
          <NavItem
            key={navItem.name + index}
            onClick={() => {
              navItem.onClick?.(); // Trigger the item's onClick handler
              setOpened(false); // Close the dropdown
            }}
            isChildren
            {...navItem}
          />
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
export function NavItemMenuMobile({
  name,
  subNavList,
  isChildren,
  onClick,
}: NavItemWithChildren & { isChildren?: boolean; onClick?: () => void }) {
  const [active, setActive] = React.useState(false);

  return (
    <div>
      <div
        onClick={() => setActive(!active)}
        className={clsx(
          "nav-drop-down flex items-center justify-between py-2 md:px-2 rounded",
        )}
      >
        <div
          className={clsx(
            "whitespace-nowrap select-none",
            isChildren && "w-full",
          )}
        >
          {name}
        </div>
        <Icon icon="oui:arrow-right"/>
      </div>
      {active && (
        <div className="border-l-blue-200 relative z-[9999]">
          <div className="bg-white fixed z-[999] max-w-[440px] top-0 left-0 p-3 w-full h-full">
            <div className="text-center">
              <div
                className="absolute left-[20px] top-[15px] cursor-pointer"
              >
                <IconArrowNarrowLeft onClick={() => setActive(false)} />
              </div>
              <Text size="lg">
                Services
              </Text>
              <Divider className="my-4" />
            </div>
            {subNavList?.map((navItem, index) => (
              <Services
                key={navItem.name + index}
                onClick={onClick}
                isChildren
                {...navItem}
              />
            ))}
          </div>
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
          onClick={navItem.onClick}
        />
      );
    else
      return (
        <NavItemMenu
          key={navItem.name}
          name={navItem.name}
          subNavList={navItem.subNavList}
          isChildren={isChildren}
          onClick={() => navItem.onClick?.()}
        />
      );
  }
  return (
    <NavItemDefault
      key={navItem.name}
      name={navItem.name}
      url={navItem.url!}
      icons={navItem.icons}
      onClick={navItem.onClick}
    />
  );
}
