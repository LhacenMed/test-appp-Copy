import { View, Text, StyleSheet, useColorScheme } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Animated from "react-native-reanimated";


const Page = () => {
  const insets = useSafeAreaInsets();

  return (
    <Animated.View style={[styles.container, { paddingTop: insets.top }]}>
      <Text>Profile Screen</Text>
    </Animated.View>
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
