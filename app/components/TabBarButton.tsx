import React, { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import icons from "../constants/TabIcon";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type IconKeys = "Home" | "Explore" | "Bookings" | "Settings";

interface TabBarButtonProps {
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  routeName: IconKeys;
  label: string;
}

const TabBarButton: React.FC<TabBarButtonProps> = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  label,
}) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    );
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1.2], [1.2, 1]);

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

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItem}
    >
      <Animated.View style={animatedIconStyle}>
        {icons[routeName]({
          color: isFocused ? "#222" : "#222",
        })}
      </Animated.View>
      <Animated.Text
        style={[
          { color: isFocused ? "#222" : "#222", fontSize: 11 },
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 12,
    marginTop: 5,
  },
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});

