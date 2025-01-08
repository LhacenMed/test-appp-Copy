// context/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useColorScheme } from "react-native";

type ThemeContextType = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme || "light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
