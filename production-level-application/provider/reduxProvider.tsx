"use client";

import StoreProvider from "@/components/wrapper/redux";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function ReduxProvider({ children }: Props) {
  return <StoreProvider>{children}</StoreProvider>;
}

export default ReduxProvider;
