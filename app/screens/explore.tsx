import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeContext } from "../../context/ThemeContext"; // Import the ThemeContext

const Page = () => {
  const insets = useSafeAreaInsets();
  const { theme } = useThemeContext(); // Access the current theme from context

  const containerStyle = [
    styles.container,
    {
      paddingTop: insets.top,
      backgroundColor: theme === "dark" ? "black" : "#eeee",
    },
  ];

  return (
    <View style={containerStyle}>
      <Text style={{ color: theme === "dark" ? "white" : "black" }}>
        Explore Screen
      </Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
