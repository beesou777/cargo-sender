"use client";
import useAuthStore from "@/store/auth";
import { redirect } from "next/navigation";
import React from "react";
import Sidebar from "./components/sidebar";
import "./style.scss";
import LoginPage from "@/components/login/googleLogin";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const authStore = useAuthStore();

  if (authStore && !authStore.isAuthenticated) {
    // return <LoginPage {...{}} />;
  }
  return (
    <>
      <div className="flex">
        <div className="lg:flex-[0_0_250px] hidden lg:block">
          <Sidebar />
        </div>
        <div className="lg:flex-[0_0_85%] flex-[0_0_100%] min-h-screen px-8 bg-backdrop">{children}</div>
      </div>
    </>
  );
};

export default DashboardLayout;
