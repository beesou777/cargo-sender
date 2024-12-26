"use client";
import {
  ActionIcon,
  Button,
  Divider,
  Drawer,
  Menu,
  Text,
  ThemeIcon,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useDisclosure } from "@mantine/hooks";
import useAuthStore from "@/store/auth";
import { NavItem } from "./navItem";
import { NAV_ITEMS } from "./constant";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  IconDashboard,
  IconLogout,
  IconUser,
  IconBoxSeam,
  IconPlus,
} from "@tabler/icons-react";
import "./style.scss";
import { useSSR } from "@/hooks/useSSR";
import LoginPage from "../login/googleLogin";

const menuData = [
  { name: "Dashboard", icon: <IconDashboard />, path: "/dashboard" },
  { name: "Create Order", icon: <IconPlus />, path: "/dashboard/orders/new" },
  { name: "Orders", icon: <IconBoxSeam />, path: "/dashboard/orders" },
  { name: "Profile", icon: <IconUser />, path: "/dashboard/profile" },
  { name: "Logout", icon: <IconLogout />, path: "/" },
];

const NavItemsDesktop = ({ closeDrawer }: { closeDrawer: () => void }) => {
  const router = useRouter();
  const { isAuthenticated, user, logOut } = useAuthStore();
  const [clientReady, setClientReady] = useState(false);
  const [loginDrawerOpened, { toggle: toggleLoginDrawer }] =
    useDisclosure(false);

  // Ensure the component is client-ready
  useEffect(() => {
    setClientReady(true);
  }, []);

  if (!clientReady) return null;
  const handleMenuClick = (path: string) => {
    if (path === "/") {
      logOut();
    } else {
      router.push(path);
    }
    closeDrawer();
  };

  return (
    <>
      {/* Nav Menus */}
      {NAV_ITEMS?.map((navItem, index) => (
        <NavItem key={navItem.name + index} {...navItem} />
      ))}
      <div className="text-gray-300">|</div>
      {isAuthenticated && (
        <Menu withArrow>
          <Menu.Target>
            <Button
              variant="subtle"
              leftSection={
                <Icon
                  className="text-lg text-indigo-500 hover:!bg-transparent"
                  icon="iconamoon:profile-circle"
                />
              }
            >
              {user?.displayName?.split(" ")[0]}
              <Icon className="nav-drop-down-icon ml-2" icon="oui:arrow-down" />
            </Button>
          </Menu.Target>
          <Menu.Dropdown className="!w-fit p-3">
            {menuData.map((item) => (
              <Menu.Item
                key={item.name}
                className="group p-2 px-2 text-[14px] font-medium text-gray-950 hover:bg-[#F3F6FB] hover:!text-gray-950"
                onClick={() => handleMenuClick(item.path)}
              >
                <div className="flex items-center">
                  <ThemeIcon
                    className="mr-2 duration-300 group-hover:!bg-blue-500 group-hover:!text-white"
                    size="lg"
                    variant="light"
                  >
                    {item.icon}
                  </ThemeIcon>
                  <Text>{item.name}</Text>
                </div>
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
      )}
      {!isAuthenticated && (
        <div className="flex">
          <Button
            onClick={toggleLoginDrawer}
            className="text-small !bg-transparent !font-normal !text-gray-700 hover:!bg-transparent hover:!text-gray-950"
          >
            Login
          </Button>
        </div>
      )}
      <Button onClick={() => router.push("/cargo-quote")}>Get a quote</Button>
      {loginDrawerOpened && (
        <LoginPage opened={loginDrawerOpened} onClose={toggleLoginDrawer} />
      )}
    </>
  );
};

const NavItemsMobile = ({ closeDrawer }: { closeDrawer: () => void }) => {
  const [loginDrawerOpened, { toggle: toggleLoginDrawer }] =
    useDisclosure(false);
  const router = useRouter();
  const { isClient } = useSSR();
  const { isAuthenticated, user, logOut } = useAuthStore();

  const handleMenuClick = (path: string) => {
    if (path === "/") {
      logOut();
    } else {
      router.push(path);
    }
    closeDrawer(); // Close the drawer after navigation
  };

  useEffect(() => {
    if (isClient && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <section className="flex min-h-[90vh] flex-col justify-between gap-4">
      <div className="grid gap-4">
        {isAuthenticated && (
          <div>
            <Menu withArrow opened>
              {menuData.map((item) => (
                <Menu.Item
                  key={item.name}
                  className="!bg-transparent !px-0 text-[14px] font-medium text-gray-950"
                  onClick={() => handleMenuClick(item.path)}
                >
                  <div className="flex items-center">
                    <ThemeIcon className="mr-2" size="lg" variant="light">
                      {item.icon}
                    </ThemeIcon>
                    <Text>{item.name}</Text>
                  </div>
                </Menu.Item>
              ))}
            </Menu>
            <Divider className="my-4" />
          </div>
        )}
        {/* Nav Menus */}
        {NAV_ITEMS?.map((navItem, index) => (
          <NavItem
            key={navItem.name + index}
            {...navItem}
            onClick={() => closeDrawer()}
          />
        ))}
      </div>
      <div className="grid gap-4">
        {isAuthenticated && (
          <Button
            className="w-full"
            variant="light"
            leftSection={
              <Icon
                className="text-lg text-indigo-500"
                icon="iconamoon:profile-circle"
              />
            }
            onClick={() => {
              router.push("/dashboard");
              closeDrawer();
            }}
          >
            {isClient ? user?.displayName?.split(" ")[0] : null}
          </Button>
        )}
        {!isAuthenticated && (
          <Button
            variant="primary"
            w={"100%"}
            onClick={() => toggleLoginDrawer()}
          >
            Login
          </Button>
        )}
        {loginDrawerOpened && (
          <LoginPage opened={loginDrawerOpened} onClose={toggleLoginDrawer} />
        )}
      </div>
    </section>
  );
};

const NavBar = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const pathname = usePathname();
  return (
    <nav className="nav-bar">
      <div
        className={`nav-bar-container ${pathname.startsWith("/dashboard") ? "px-[20px]" : "safe-area px-0"}`}
      >
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
          <NavItemsDesktop closeDrawer={close} />
        </div>
        {/* For Mobile */}
        <div className="nav-items-mobile">
          <Drawer opened={opened} onClose={close} title="Menu">
            <NavItemsMobile closeDrawer={close} />
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
