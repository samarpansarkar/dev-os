"use client";

import * as React from "react";
import { QueryProvider } from "./query-provider";

import { AppearanceProvider } from "./appearance-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AppearanceProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </AppearanceProvider>
    </QueryProvider>
  );
}
