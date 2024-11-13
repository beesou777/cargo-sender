"use client";
import { ActionIcon, Button, Drawer, Menu, Text, ThemeIcon, rem } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useDisclosure } from "@mantine/hooks";
import useAuthStore from "@/store/auth";
import { NavItem } from "./navItem";
import { NAV_ITEMS } from "./constant";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  IconDashboard,
  IconLogout,
  IconUser,
  IconBoxSeam
} from '@tabler/icons-react';
import "./style.scss";
import { useSSR } from "@/hooks/useSSR";

const menuData = [
  { name: "Dashboard", icon: <IconDashboard />, path: "/dashboard" },
  { name: "Orders", icon: <IconBoxSeam />, path: "/dashboard/orders" },
  { name: "Profile", icon: <IconUser />, path: "/dashboard/profile" },
  { name: "Logout", icon: <IconLogout />, path: "/" },
];

const NavItemsDesktop = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    setClientReady(true);
  }, []);

  if (!clientReady) return null;

  const handleMenuClick = (path: string) => {
    router.push(path);
  };

  return (
    <>
      {/* Nav Menus */}
      {NAV_ITEMS?.map((navItem, index) => (
        <NavItem key={navItem.name + index} {...navItem} />
      ))}
      <div className="text-gray-300">|</div>
      {isAuthenticated &&
        <Menu withArrow>
          <Menu.Target>
            <Button variant="subtle" leftSection={<Icon className="text-lg text-indigo-500 hover:!bg-transparent" icon="iconamoon:profile-circle" />}>
              {user?.displayName?.split(" ")[0]}
              <Icon className="nav-drop-down-icon ml-2" icon="oui:arrow-down" />
            </Button>
          </Menu.Target>

          <Menu.Dropdown className="p-3 !w-fit">
            {menuData.map((item) => (
              <Menu.Item
                key={item.name}
                className="group px-2 hover:bg-[#F3F6FB] p-2 text-gray-950 font-medium hover:!text-gray-950 text-[14px]"
                onClick={() => handleMenuClick(item.path)}
              >
                <div className="flex items-center">
                  <ThemeIcon className="group-hover:!bg-blue-500 group-hover:!text-white mr-2 duration-300" size="lg" variant="light">
                    {item.icon}
                  </ThemeIcon>
                  <Text>{item.name}</Text>
                </div>
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
      }
      {
        !isAuthenticated &&
        <div className="flex gap-2">
          <Link href="/login" className="text-gray-700 hover:text-gray-950 text-small">
            Login
          </Link>
          <Link href="/login" className="text-gray-700 hover:text-gray-950 text-small">
            Signup
          </Link>
        </div>
      }
      <Button onClick={() => router.push("/cargo-quote")}>
        Get a quote
      </Button>
    </>
  );
};

const NavItemsMobile = () => {
  const router = useRouter()
  const { isClient } = useSSR()
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
        {isAuthenticated &&
          <Button
            className="w-full"
            variant="light"
            leftSection={
              <Icon
                className="text-lg text-indigo-500"
                icon="iconamoon:profile-circle"
              />
            }
            onClick={() => router.push("/dashboard")}
          >
            {isClient ? user?.displayName?.split(" ")[0] : null}
          </Button>
        }
        <Button className="w-full" onClick={() => router.push(isAuthenticated ? "/cargo-quote" : "/login")}>{isAuthenticated ? 'Get a quote' : "Login"}</Button>
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
            src="/assets/icons/brand-logo.png"
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
