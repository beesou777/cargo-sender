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
      className="nav-link group flex items-center !px-0 py-2 !font-normal text-gray-950 hover:bg-[#F3F6FB] hover:!text-gray-950"
    >
      {Icon && (
        <ThemeIcon
          className="mr-2 duration-300 group-hover:!bg-blue-500 group-hover:!text-white"
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
      <Menu.Dropdown className="grid !w-fit p-3">
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
          "nav-drop-down flex items-center justify-between rounded py-2 md:px-2"
        )}
      >
        <div
          className={clsx(
            "select-none whitespace-nowrap",
            isChildren && "w-full"
          )}
        >
          {name}
        </div>
        <Icon icon="oui:arrow-right" />
      </div>
      {active && (
        <div className="relative z-[9999] border-l-blue-200">
          <div className="fixed left-0 top-0 z-[999] h-full w-full max-w-[440px] bg-white p-3">
            <div className="text-center">
              <div className="absolute left-[20px] top-[15px] cursor-pointer">
                <IconArrowNarrowLeft onClick={() => setActive(false)} />
              </div>
              <Text size="lg">Services</Text>
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
