"use client";

import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import React, { useEffect } from "react";
import StoreProvider, { useAppSelector } from "./redux";

type Props = {
  children: React.ReactNode;
};

function DashboardLayout({ children }: Props) {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      <SideBar />
      <main
        className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg ${isSidebarCollapsed ? "" : "md:pl-64"}`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
}

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
