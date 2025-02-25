import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance, ColorSchemeName } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [theme, setTheme] = useState<ColorSchemeName>("light"); // Default to light theme
  const [mode, setMode] = useState<ThemeMode>("system");

  // Load saved theme on mount
  useEffect(() => {
    const loadSavedTheme = async () => {
      const savedTheme = (await AsyncStorage.getItem(
        "selectedTheme"
      )) as ThemeMode | null;
      console.log("Saved theme retrieved:", savedTheme);
      if (
        savedTheme === "light" ||
        savedTheme === "dark" ||
        savedTheme === "system"
      ) {
        applyTheme(savedTheme);
      } else {
        applyTheme("system"); // Default to system if no valid theme is found
      }
    };
    loadSavedTheme();
  }, []);

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
    AsyncStorage.setItem("selectedTheme", selectedMode);
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

    // // Initial setup
    // if (mode === "system") {
    //   setTimeout(() => {
    //     const currentSystemTheme = Appearance.getColorScheme();
    //     console.log(
    //       "Initial system theme check after delay:",
    //       currentSystemTheme
    //     );
    //     setTheme(currentSystemTheme || "light");
    //   }, 100); // Delay of 100ms
    // }

    return () => subscription.remove();
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
