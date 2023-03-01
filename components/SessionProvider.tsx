"use client";

import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";
import React from "react";

type Props = {
  children: React.ReactNode;
  session: Session | null;
};

function SessionProvider({ children, session }: Props) {
  return <Provider>{children}</Provider>;
}

export default SessionProvider;
