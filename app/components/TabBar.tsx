import { View, StyleSheet, LayoutChangeEvent, Platform } from "react-native";
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import TabBarButton from "./TabBarButton";
import { useState, useContext } from "react";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { ThemeContext } from "../../context/ThemeContext";

interface CustomTabNavigationOptions extends BottomTabNavigationOptions {
  blurEnabled?: boolean;
}

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { theme } = useContext(ThemeContext);
  const backgroundColor = theme === "dark" ? "#121212" : "#fff";

  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });

  const buttonWidth = dimensions.width / state.routes.length;

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tabPositionX.value }],
  }));

  const blurEnabled =
    Platform.OS === "ios" &&
    (
      descriptors[state.routes[state.index].key]
        ?.options as CustomTabNavigationOptions
    ).blurEnabled;

  const TabBarContent = (
    <View
      onLayout={onTabbarLayout}
      style={[styles.tabbar, { backgroundColor }]}
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            position: "absolute",
            borderRadius: 30,
            marginHorizontal: 8,
            height: dimensions.height - 15,
            width: buttonWidth - 15,
          },
        ]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === "string"
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {
            stiffness: 250,
            damping: 23,
            mass: 1,
            overshootClamping: false,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 2,
            reduceMotion: ReduceMotion.System,
          });
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={
              route.name as "Home" | "Explore" | "Bookings" | "Settings"
            }
            label={label}
          />
        );
      })}
    </View>
  );

  return blurEnabled ? (
    <BlurView intensity={50} tint="light" style={styles.blurView}>
      {TabBarContent}
    </BlurView>
  ) : (
    <View style={styles.blurView}>{TabBarContent}</View>
  );
}

const styles = StyleSheet.create({
  blurView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  tabbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingBottom: 20,
    marginBottom: Platform.OS === "ios" ? 15 : 0,
  },
});
