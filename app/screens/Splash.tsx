import { View, Text, StyleSheet, Button, Dimensions } from "react-native";
import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import AnimatedLottieView from "lottie-react-native";

interface SplashProps {
  onAnimationFinish: (isCancelled: boolean) => void;
}

const Splash: React.FC<SplashProps> = ({
  onAnimationFinish = () => {},
}: {
  onAnimationFinish?: (isCancelled: boolean) => void;
}) => {
  const animation = useRef<LottieView>(null);

  return (
    <View style={styles.animationContainer}>
      <AnimatedLottieView
        onAnimationFinish={onAnimationFinish}
        autoPlay
        loop={false}
        ref={animation}
        style={{
          width: "80%",
          maxWidth: 400,
          height: "80%",
          maxHeight: 400,
        }}
        source={require("../../assets/lottie/Logo.json")}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
