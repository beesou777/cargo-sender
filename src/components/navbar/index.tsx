"use client";
import { Button, Menu } from "@mantine/core";
import clsx from "clsx";
import Link from "next/link";
import {
  NAV_ITEMS,
  NavItemT,
  NavItemWithChildren,
  NavItemWithUrl,
} from "./navItems";

import { Icon } from "@iconify/react";

import "./style.scss";

function NavItemDefault({ name, url }: NavItemWithUrl) {
  return (
    <Link className="nav-link" href={url}>
      {name}
    </Link>
  );
}

function NavItemMenu({
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
          <span className={clsx("whitespace-nowrap", isChildren && "w-full")}>
            {name}
          </span>
          <Icon className="nav-drop-down-icon" icon="oui:arrow-down" />
        </div>
      </Menu.Target>
      <Menu.Dropdown className="p-3">
        {subNavList?.map((navItem, index) => (
          <NavItem key={navItem.name + index} isChildren {...navItem} />
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

function NavItem(props: NavItemT & { isChildren?: boolean }) {
  const { isChildren, ...navItem } = props;
  if (navItem?.subNavList) {
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

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <div className="nav-bar-container safe-area">
        <div>Logoipsum</div>
        <div className="nav-items">
          {/* Nav Menus */}
          {NAV_ITEMS?.map((navItem, index) => (
            <NavItem key={navItem.name + index} {...navItem} />
          ))}
          <span className="text-gray-300">|</span>
          <Link href="/" className="nav-link with-icon" passHref>
            <Icon className="text-base" icon="iconamoon:profile-circle" />
            <span>My Account</span>
          </Link>
          <Link href="/" passHref>
            <Button>Get a quote</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
