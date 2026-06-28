"use client";

import * as React from "react";
import { QueryProvider } from "./query-provider";
import { AppearanceProvider } from "./appearance-provider";
import { ReduxProvider } from "./redux-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
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
    </ReduxProvider>
  );
}
