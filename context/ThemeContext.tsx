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
  const [theme, setTheme] = useState<ColorSchemeName>(() => {
    const initialSystemTheme = Appearance.getColorScheme();
    console.log("Initial system theme on startup:", initialSystemTheme);
    return initialSystemTheme || "light";
  });
  const [mode, setMode] = useState<ThemeMode>("system");

  const applyTheme = (selectedMode: ThemeMode) => {
    console.log("applyTheme called with mode:", selectedMode);
    if (selectedMode === "system") {
      const systemTheme = Appearance.getColorScheme();
      console.log("System theme detected:", systemTheme);
      setTheme(systemTheme || "light");
    } else {
      setTheme(selectedMode);
    }
    setMode(selectedMode);
  };

  const toggleTheme = (newMode: ThemeMode) => {
    console.log("toggleTheme called with mode:", newMode);
    applyTheme(newMode);
  };

  // Initialize theme on mount and listen for changes
  useEffect(() => {
    console.log("Current mode:", mode);
    console.log("Current theme:", theme);

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      console.log("System theme changed to:", colorScheme);
      if (mode === "system") {
        setTimeout(() => {
          const updatedTheme = Appearance.getColorScheme();
          console.log("Updated system theme after delay:", updatedTheme);
          setTheme(updatedTheme || "light");
        }, 100); // Delay of 100ms
      }
    });

    // Initial setup
    if (mode === "system") {
      setTimeout(() => {
        const currentSystemTheme = Appearance.getColorScheme();
        console.log(
          "Initial system theme check after delay:",
          currentSystemTheme
        );
        setTheme(currentSystemTheme || "light");
      }, 100); // Delay of 100ms
    }

    return () => subscription.remove();
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
