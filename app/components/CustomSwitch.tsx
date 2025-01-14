import React, { useEffect, useState } from "react";
import { StyleSheet, Pressable, StyleProp, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolateColor,
  runOnJS,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

interface CustomSwitchProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  trackColor?: { true: string; false: string };
  thumbColor?: { true: string; false: string };
  style?: StyleProp<ViewStyle>;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  value,
  onValueChange,
  trackColor = { true: "#34C759", false: "#E5E5EA" },
  thumbColor = { true: "#ffffff", false: "#ffffff" },
  style,
}) => {
  // Spring configuration for animations
  const springConfig = {
    stiffness: 250,
    damping: 23,
    mass: 1,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
  };

  // Shared values
  const circleScale = useSharedValue(0);
  const circleOpacity = useSharedValue(0);
  const translateX = useSharedValue(value ? 60 - 36 : 0); // 60 (switch width) - 36 (thumb size)
  const scale = useSharedValue(1);

  const [isOn, setIsOn] = useState(value);

  // Toggle switch on press
  const toggleSwitch = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    onValueChange(newValue);
  };

  // Update translateX value based on the state change
  useEffect(() => {
    translateX.value = withSpring(isOn ? 60 - 36 : 0, springConfig);
  }, [isOn]);

  // Animated style for the scaling circle
  const circleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { scale: circleScale.value }],
    opacity: circleOpacity.value,
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Transparent gray color
  }));

  // Animated style for the thumb
  const thumbAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { scale: scale.value }],
    backgroundColor: interpolateColor(
      translateX.value,
      [0, 60 - 36],
      [thumbColor.false, thumbColor.true]
    ),
  }));

  // Gesture handling
  const gesture = Gesture.Pan()
    .onBegin(() => {
      scale.value = withSpring(0.7, springConfig);
      circleScale.value = withSpring(1.5, springConfig);
      circleOpacity.value = withSpring(1, springConfig);
    })
    .onUpdate((e) => {
      translateX.value = Math.min(
        Math.max(e.translationX + (isOn ? 60 - 36 : 0), 0),
        60 - 36
      );
    })
    .onEnd(() => {
      scale.value = withSpring(1, springConfig);
      circleScale.value = withSpring(0, springConfig);
      circleOpacity.value = withSpring(0, springConfig);

      const midpoint = (60 - 36) / 2;
      if (translateX.value > midpoint) {
        translateX.value = withSpring(60 - 36, springConfig);
        runOnJS(setIsOn)(true);
        runOnJS(onValueChange)(true);
      } else {
        translateX.value = withSpring(0, springConfig);
        runOnJS(setIsOn)(false);
        runOnJS(onValueChange)(false);
      }
    })
    .onFinalize(() => {
      scale.value = withSpring(1, springConfig);
      circleScale.value = withSpring(0, springConfig);
      circleOpacity.value = withSpring(0, springConfig);
    });

  // Animated style for the track (background)
  const trackAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      translateX.value,
      [0, 60 - 36],
      [trackColor.false, trackColor.true]
    ),
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Pressable onPress={toggleSwitch} style={[styles.container, style]}>
        <Animated.View style={[styles.track, trackAnimatedStyle]} />
        <Animated.View
          style={[
            {
              position: "absolute",
              width: 22, // Slightly larger than thumb for effect
              height: 22,
              borderRadius: (36 + 10) / 2, // Adjusted for thumb size
              left: 2,
            },
            circleAnimatedStyle,
          ]}
        />
        <Animated.View style={[styles.thumb, thumbAnimatedStyle]} />
      </Pressable>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 25,
    justifyContent: "center",
    borderRadius: 15,
    padding: 4,
  },
  track: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 15,
  },
  thumb: {
    width: 20,
    height: 20,
    left: 3,
    borderRadius: 50,
    position: "absolute",
    backgroundColor: "white",
    // elevation: 2,
  },
});

export default CustomSwitch;
