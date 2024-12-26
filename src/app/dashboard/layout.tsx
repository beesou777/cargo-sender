"use client";
import useAuthStore from "@/store/auth";
import React from "react";
import Sidebar from "./components/sidebar";
import "./style.scss";
import LoginPage from "@/components/login/googleLogin";
import { useDisclosure } from "@mantine/hooks";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const authStore = useAuthStore();
  const [loginDrawerOpened, { toggle: toggleLoginDrawer }] =
    useDisclosure(false);

  if (authStore && !authStore.isAuthenticated) {
    <LoginPage opened={loginDrawerOpened} onClose={toggleLoginDrawer} />;
  }
  return (
    <>
      <div className="flex">
        <div className="hidden lg:block lg:flex-[0_0_250px]">
          <Sidebar />
        </div>
        <div className="min-h-screen flex-[0_0_100%] overflow-x-hidden bg-backdrop px-8 lg:flex-[0_0_85%]">
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
