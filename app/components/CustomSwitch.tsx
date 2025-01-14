import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";
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
  const springConfig = {
    stiffness: 1500,
    damping: 150,
    mass: 1,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
  };
  const circleScale = useSharedValue(0); // Start with no scale
  const circleOpacity = useSharedValue(0); // Start fully transparent

  const switchWidth = 55;
  const thumbRadius = 18;
  const thumbSize = thumbRadius * 2;
  const padding = 0;
  const translateX = useSharedValue(
    value ? switchWidth - thumbSize - padding : 0
  );

  const circleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { scale: circleScale.value }],
    opacity: circleOpacity.value,
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Transparent gray color
  }));
  const [isOn, setIsOn] = useState(value);

  const toggleSwitch = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    onValueChange(newValue);
  };

  useEffect(() => {
    translateX.value = withSpring(
      isOn ? switchWidth - thumbSize - padding : 0,
      springConfig
    );
  }, [isOn]);

  const scale = useSharedValue(1);

  const thumbAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { scale: scale.value }],
    backgroundColor: interpolateColor(
      translateX.value,
      [0, switchWidth - thumbSize - padding],
      [thumbColor.false, thumbColor.true]
    ),
  }));

  const gesture = Gesture.Pan()
    .onBegin(() => {
      scale.value = withSpring(0.7, springConfig);
      circleScale.value = withSpring(1.5, springConfig); // Scale up the circle
      circleOpacity.value = withSpring(1, springConfig); // Fade in the circle
    })
    .onUpdate((e) => {
      translateX.value = Math.min(
        Math.max(
          e.translationX + (isOn ? switchWidth - thumbSize - padding : 0),
          0
        ),
        switchWidth - thumbSize - padding
      );
    })
    .onEnd(() => {
      scale.value = withSpring(1, springConfig);
      circleScale.value = withSpring(0, springConfig); // Shrink the circle back
      circleOpacity.value = withSpring(0, springConfig); // Fade out the circle
      const midpoint = (switchWidth - thumbSize - padding) / 2;
      if (translateX.value > midpoint) {
        translateX.value = withSpring(
          switchWidth - thumbSize - padding,
          springConfig
        );
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

  const trackAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      translateX.value,
      [0, switchWidth - thumbSize - padding],
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
              borderRadius: (thumbSize + 10) / 2,
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
    width: 45,
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
  },
});

export default CustomSwitch;
