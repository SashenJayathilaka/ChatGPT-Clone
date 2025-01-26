import DashboardWrapper from "@/components/wrapper/dashboardWrapper";
import React from "react";
import { ToastContainer } from "react-toastify";

type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props) {
  return (
    <DashboardWrapper>
      <ToastContainer />
      {children}
    </DashboardWrapper>
  );
}

export default layout;
