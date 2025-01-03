import React, { useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Animated } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default NextButton = ({ percentage, scrollTo }) => {
  const navigation = useNavigation();
  const handleHome = () => {
    navigation.navigate("Inside");
  };
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;

  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: false, // Must be false for animating SVG props
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} fill="none">
        <G rotation="-90" origin={center}>
          <Circle
            stroke="none"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <AnimatedCircle
            stroke="#F4338F"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={progressAnimation.interpolate({
              inputRange: [0, 100],
              outputRange: [circumference, 0],
            })}
          />
        </G>
      </Svg>
      <TouchableOpacity
        onPress={scrollTo}
        style={styles.button}
        activeOpacity={0.6}
      >
        <AntDesign name="arrowright" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    backgroundColor: "#f4338f",
    borderRadius: 100,
    padding: 20,
  },
});
