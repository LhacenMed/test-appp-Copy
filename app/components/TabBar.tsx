import { View, StyleSheet, LayoutChangeEvent, Platform } from "react-native";
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import TabBarButton from "./TabBarButton";
import { useState, useContext, useEffect, useMemo } from "react";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { ThemeContext } from "../../context/ThemeContext";
import { useTabBar } from "../../context/TabBarContext";

interface CustomTabNavigationOptions extends BottomTabNavigationOptions {
  blurEnabled?: boolean;
}

interface PopupState {
  label: string;
  index: number;
  timeoutId?: NodeJS.Timeout;
  opacity: Animated.SharedValue<number>;
}

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { theme } = useContext(ThemeContext);
  const { isTabBarVisible } = useTabBar();
  const translateY = useSharedValue(0);
  const [activePopups, setActivePopups] = useState<
    { label: string; index: number }[]
  >([]);
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });
  const buttonWidth = dimensions.width / state.routes.length;

  // Create shared values at the top level
  const popupOpacities = state.routes.map(() => useSharedValue(0));

  const popupStyles = state.routes.map((_, index) =>
    useAnimatedStyle(() => ({
      opacity: popupOpacities[index].value,
      transform: [
        {
          translateY: interpolate(popupOpacities[index].value, [0, 1], [10, 0]),
        },
        { translateX: index * buttonWidth + buttonWidth / 2 - 50 },
      ],
    }))
  );

  useEffect(() => {
    translateY.value = withTiming(isTabBarVisible ? 0 : 100, {
      duration: 200,
    });
  }, [isTabBarVisible]);

  const backgroundColor = theme === "dark" ? "#121212" : "#fff";
  const borderTopColor = theme === "dark" ? "#1E1E1E" : "#eee";

  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tabPositionX.value }],
  }));

  const slideAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const handleLongPress = (index: number, label: string) => {
    popupOpacities[index].value = withTiming(1, { duration: 200 });
    setActivePopups((prev) => [...prev, { label, index }]);
  };

  const handlePressOut = (index: number) => {
    setTimeout(() => {
      popupOpacities[index].value = withTiming(0, { duration: 200 });
      setActivePopups((prev) => prev.filter((popup) => popup.index !== index));
    }, 2000);
  };

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

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
      {/* Popups Container */}
      {/* <View style={styles.popupsContainer}>
        {activePopups.map((popup) => (
          <Animated.View
            key={popup.index}
            style={[
              styles.popup,
              { backgroundColor: theme === "dark" ? "#2A2A2A" : "#FFFFFF" },
              popupStyles[popup.index],
            ]}
          >
            <Animated.Text
              style={[
                styles.popupText,
                { color: theme === "dark" ? "#fff" : "#000" },
              ]}
            >
              {popup.label}
            </Animated.Text>
          </Animated.View>
        ))}
      </View> */}
      {/* End of Popups Container */}
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
          handleLongPress(index, label);
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
            onPressOut={() => handlePressOut(index)}
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

  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

  return blurEnabled ? (
    <AnimatedBlurView
      intensity={50}
      tint="light"
      style={[
        styles.blurView,
        { borderTopColor: borderTopColor },
        slideAnimation,
      ]}
    >
      {TabBarContent}
    </AnimatedBlurView>
  ) : (
    <Animated.View
      style={[
        styles.blurView,
        { borderTopColor: borderTopColor },
        slideAnimation,
      ]}
    >
      {TabBarContent}
    </Animated.View>
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
  popup: {
    position: "absolute",
    bottom: 100,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    left: 11,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  popupText: {
    fontSize: 14,
    fontWeight: "600",
  },
  popupsContainer: {
    position: "absolute",
    bottom: 120,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
});
