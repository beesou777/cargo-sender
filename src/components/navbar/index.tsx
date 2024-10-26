"use client";
import { ActionIcon, Button, Drawer } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useDisclosure } from "@mantine/hooks";

import useAuthStore from "@/store/auth";
import { NavItem } from "./navItem";
import { NAV_ITEMS } from "./constant";

import "./style.scss";

const NavItemsDesktop = () => {
  const { isAuthenticated, user } = useAuthStore()
  return (
    <>
      {/* Nav Menus */}
      {NAV_ITEMS?.map((navItem, index) => (
        <NavItem key={navItem.name + index} {...navItem} />
      ))}
      <span className="text-gray-300">|</span>
      <Link href="/" className="nav-link with-icon" passHref>
        <Icon
          className="text-lg text-indigo-500"
          icon="iconamoon:profile-circle"
        />
        <span>{user?.displayName?.split(" ")[0]}</span>
      </Link>
      <Link href={isAuthenticated ? "/cargo-quote" : "/login"} passHref>
        <Button>{isAuthenticated ? 'Get a quote' : "Login"}</Button>
      </Link>
    </>
  );
};
const NavItemsMobile = () => {
  const { isAuthenticated, user } = useAuthStore()
  return (
    <section className="min-h-[90vh] flex gap-4 justify-between flex-col">
      <div className="grid gap-4">
        {/* Nav Menus */}
        {NAV_ITEMS?.map((navItem, index) => (
          <NavItem key={navItem.name + index} {...navItem} />
        ))}
      </div>
      <div className="grid gap-4">
        <Link href="/" className="nav-link with-icon" passHref>
          <Button
            className="w-full"
            variant="light"
            leftSection={
              <Icon
                className="text-lg text-indigo-500"
                icon="iconamoon:profile-circle"
              />
            }
          >
            <span>{user?.displayName}</span>
          </Button>
        </Link>
        <Link className="w-full" href={isAuthenticated ? "/cargo-quote" : "/login"} passHref>
          <Button className="w-full">{isAuthenticated ? 'Get a quote' : "Login"}</Button>
        </Link>
      </div>
    </section>
  );
};

const NavBar = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <nav className="nav-bar">
      <div className="nav-bar-container safe-area">
        <Link href="/">
          <Image
            className="object-contain"
            width={137}
            height={30}
            src="/assets/icons/brand-logo.svg"
            alt="find-us"
          />
        </Link>
        {/* For Desktop */}
        <div className="nav-items-desktop">
          <NavItemsDesktop />
        </div>
        {/* For Mobile */}
        <div className="nav-items-mobile">
          <Drawer opened={opened} onClose={close} title="Menu">
            <NavItemsMobile />
          </Drawer>
          <ActionIcon size="lg" variant="light" onClick={open}>
            <Icon className="text-lg" icon="pepicons-pop:menu" />
          </ActionIcon>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
