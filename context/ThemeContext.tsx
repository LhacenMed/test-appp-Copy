import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance, ColorSchemeName } from "react-native";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeContextProps {
  theme: ColorSchemeName;
  mode: ThemeMode;
  toggleTheme: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  mode: "system",
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ColorSchemeName>("light");
  const [mode, setMode] = useState<ThemeMode>("system");

  const applyTheme = (selectedMode: ThemeMode) => {
    if (selectedMode === "system") {
      const systemTheme = Appearance.getColorScheme();
      setTheme(systemTheme || "light");
    } else {
      setTheme(selectedMode);
    }
    setMode(selectedMode);
  };

  const toggleTheme = (newMode: ThemeMode) => {
    if (newMode === "light" || newMode === "dark") {
      applyTheme(newMode);
    } else {
      // For "system", get the current system theme
      const systemTheme = Appearance.getColorScheme();
      applyTheme(systemTheme || "light"); // Default to light if undefined
    }
  };

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (mode === "system") {
        setTheme(colorScheme || "light");
      }
    });
    return () => subscription.remove();
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
