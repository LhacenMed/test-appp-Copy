import React, { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import icons from "../constants/TabIcon";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

type TabBarButtonProps = {
  onPress: () => void;
  onLongPress: () => void;
  onPressOut: () => void;
  isFocused: boolean;
  routeName: "Home" | "Explore" | "Bookings" | "Settings";
  label: string;
};

const TabBarButton: React.FC<TabBarButtonProps> = ({
  onPress,
  onLongPress,
  onPressOut,
  isFocused,
  routeName,
  label,
}) => {
  const scale = useSharedValue(0);
  const circleOpacity = useSharedValue(0);
  const borderOpacity = useSharedValue(0);
  const [isLongPressed, setIsLongPressed] = useState(false);
  const { theme } = useContext(ThemeContext);
  const buttonTextColor = theme === "dark" ? "#fff" : "#000";
  const circleBackgroundColor =
    theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, {
      damping: 20,
      stiffness: 500,
    });
  }, [scale, isFocused]);

  const handlePressIn = () => {
    // Remove circle animation from regular press
  };

  const handlePressOut = () => {
    if (isLongPressed) {
      circleOpacity.value = withTiming(0, { duration: 300 }); // Fade out circle
      borderOpacity.value = withTiming(1, { duration: 300 }); // Fade in the border
      setIsLongPressed(false);
      onPressOut();
    }
  };

  const handleLongPress = () => {
    setIsLongPressed(true);
    circleOpacity.value = withTiming(1, { duration: 0 }); // Fade in circle
    borderOpacity.value = 0; // Hide border on long press
    onLongPress();
  };

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1.2], [1.2, 1.1]);
    const top = interpolate(scale.value, [0, 1], [9, 0]);

    return {
      transform: [
        {
          scale: scaleValue,
        },
      ],
      top,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [1, 0], [1, 0]);

    return {
      opacity,
    };
  });

  const animatedCircleStyle = useAnimatedStyle(() => {
    return {
      opacity: circleOpacity.value,
      borderWidth: 1,
      borderColor:
        theme === "dark"
          ? `rgba(255, 255, 255, ${borderOpacity.value})`
          : `rgba(0, 0, 0, ${borderOpacity.value})`,
    };
  });

  return (
    <Pressable
      onPress={onPress}
      onLongPress={handleLongPress}
      onPressOut={handlePressOut}
      style={styles.tabbarItem}
    >
      {/* Circular Background */}
      <Animated.View
        style={[
          styles.circleBackground,
          { backgroundColor: circleBackgroundColor },
          animatedCircleStyle,
        ]}
      />

      {/* Icon */}
      <Animated.View style={animatedIconStyle}>
        {icons[routeName]({
          isFocused,
          color: isFocused ? "rgb(0, 0, 0)" : "rgb(124, 124, 124)",
          height: 22,
          width: 22,
        })}
      </Animated.View>

      {/* Label */}
      <Animated.Text
        style={[
          {
            color: buttonTextColor,
            fontSize: 11,
          },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  circleBackground: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    zIndex: -1,
  },
});
