"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

type AccentColor = "blue" | "purple" | "rose" | "emerald" | "amber" | "slate" | "default";
type Density = "comfortable" | "compact";

interface AppearanceContextType {
  theme?: string;
  setTheme: (theme: string) => void;
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
  density: Density;
  setDensity: (density: Density) => void;
}

const AppearanceContext = createContext<AppearanceContextType | undefined>(undefined);

const ACCENT_COLORS = {
  default: { primary: "#adc6ff", foreground: "#002e6a", ring: "#adc6ff" },
  blue: { primary: "#3b82f6", foreground: "#ffffff", ring: "#3b82f6" },
  purple: { primary: "#a855f7", foreground: "#ffffff", ring: "#a855f7" },
  rose: { primary: "#f43f5e", foreground: "#ffffff", ring: "#f43f5e" },
  emerald: { primary: "#10b981", foreground: "#ffffff", ring: "#10b981" },
  amber: { primary: "#f59e0b", foreground: "#ffffff", ring: "#f59e0b" },
  slate: { primary: "#64748b", foreground: "#ffffff", ring: "#64748b" },
};

function AppearanceContextWrapper({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const [accentColor, setAccentColorState] = useState<AccentColor>("default");
  const [density, setDensityState] = useState<Density>("comfortable");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const savedColor = localStorage.getItem("devos-accent-color") as AccentColor;
    const savedDensity = localStorage.getItem("devos-density") as Density;
    
    if (savedColor && ACCENT_COLORS[savedColor]) setAccentColorState(savedColor);
    if (savedDensity) setDensityState(savedDensity);
    
    setMounted(true);
  }, []);

  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color);
    localStorage.setItem("devos-accent-color", color);
  };

  const setDensity = (newDensity: Density) => {
    setDensityState(newDensity);
    localStorage.setItem("devos-density", newDensity);
  };

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const colors = ACCENT_COLORS[accentColor];
    
    // Apply primary colors globally
    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--primary-foreground", colors.foreground);
    root.style.setProperty("--ring", colors.ring);
    root.style.setProperty("--sidebar-primary", colors.primary);
    root.style.setProperty("--sidebar-primary-foreground", colors.foreground);
    
    // Apply density class
    if (density === "compact") {
      root.classList.add("density-compact");
    } else {
      root.classList.remove("density-compact");
    }
  }, [accentColor, density, mounted]);
  
  return (
    <AppearanceContext.Provider value={{ theme, setTheme, accentColor, setAccentColor, density, setDensity }}>
      {children}
    </AppearanceContext.Provider>
  );
}

export function AppearanceProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <AppearanceContextWrapper>
        {children}
      </AppearanceContextWrapper>
    </NextThemesProvider>
  );
}

export function useAppearance() {
  const context = useContext(AppearanceContext);
  if (context === undefined) {
    throw new Error("useAppearance must be used within an AppearanceProvider");
  }
  return context;
}
