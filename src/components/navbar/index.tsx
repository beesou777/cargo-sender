"use client";
import { ActionIcon, Button, Drawer, Text, Menu, rem } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useDisclosure } from "@mantine/hooks";
import useAuthStore from "@/store/auth";
import { NavItem } from "./navItem";
import { NAV_ITEMS } from "./constant";
import {
  IconSettings,
  IconPhoto,
  IconMessageCircle,
} from '@tabler/icons-react';
import "./style.scss";
import { useSSR } from "@/hooks/useSSR";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const NavItemsDesktop = () => {
  const router = useRouter()
  const { isClient } = useSSR()
  const { isAuthenticated, user } = useAuthStore()
  const [clientReady, setClientReady] = useState(false)

  useEffect(() => {
    setClientReady(true)
  }, [])

  if (!clientReady) return null

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
            <Button variant="subtle" leftSection={<Icon className="text-lg text-indigo-500" icon="iconamoon:profile-circle" />}>
              {user?.displayName?.split(" ")[0]}
            </Button>
          </Menu.Target>


          <Menu.Dropdown>
            <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
              Dashboard
            </Menu.Item>
            <Menu.Item leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>
              Orders
            </Menu.Item>
            <Menu.Item leftSection={<IconPhoto style={{ width: rem(14), height: rem(14) }} />}>
              Profile
            </Menu.Item>
            <Menu.Item leftSection={<IconPhoto style={{ width: rem(14), height: rem(14) }} />}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      }
      <Button onClick={() => router.push(isAuthenticated ? "/cargo-quote" : "/login")}>{isAuthenticated ? 'Get a quote' : "Login"}</Button>
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
