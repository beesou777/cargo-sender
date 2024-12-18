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
        <div className="lg:flex-[0_0_250px] hidden lg:block">
          <Sidebar />
        </div>
        <div className="lg:flex-[0_0_85%] flex-[0_0_100%] min-h-screen px-8 bg-backdrop overflow-x-hidden">
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
