import React, { useRef } from "react";
import { StyleSheet, View, Pressable, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CustomText from "./CustomText";
import { BottomSheetMethods } from "./BottomSheet";

interface LocationInputsProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
}

const LocationInputs: React.FC<LocationInputsProps> = ({ bottomSheetRef }) => {
  const animatedBgFrom = useRef(new Animated.Value(0)).current;
  const animatedBgTo = useRef(new Animated.Value(0)).current;

  const interpolatedBgFrom = animatedBgFrom.interpolate({
    inputRange: [0, 1],
    outputRange: ["#1E1E1E", "#2A2A2A"],
  });

  const interpolatedBgTo = animatedBgTo.interpolate({
    inputRange: [0, 1],
    outputRange: ["#1E1E1E", "#2A2A2A"],
  });

  const handlePressInFrom = () => {
    animatedBgFrom.setValue(1);
  };

  const handlePressOutFrom = () => {
    Animated.timing(animatedBgFrom, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const handlePressInTo = () => {
    animatedBgTo.setValue(1);
  };

  const handlePressOutTo = () => {
    Animated.timing(animatedBgTo, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const showModal = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    }
    console.log("Show modal called");
  };

  return (
    <View style={styles.locationContainer}>
      <Animated.View
        style={[
          styles.inputFieldContainer,
          { backgroundColor: interpolatedBgFrom },
        ]}
      >
        <Pressable
          onPressIn={handlePressInFrom}
          onPressOut={handlePressOutFrom}
          onPress={showModal}
          style={styles.pressable}
        >
          <CustomText style={styles.inputLabel}>From?</CustomText>
        </Pressable>
      </Animated.View>
      <View style={styles.border} />
      <Animated.View
        style={[
          styles.inputFieldContainerSecond,
          { backgroundColor: interpolatedBgTo },
        ]}
      >
        <Pressable
          onPressIn={handlePressInTo}
          onPressOut={handlePressOutTo}
          onPress={showModal}
          style={styles.pressable}
        >
          <CustomText style={styles.inputLabel}>To?</CustomText>
        </Pressable>
      </Animated.View>
      <Pressable
        style={({ pressed }) => [
          styles.swapButton,
          pressed && styles.swapButtonPressed,
        ]}
      >
        <MaterialIcons name="swap-vert" size={24} color="#fff" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  locationContainer: {
    backgroundColor: "#1C1C1E",
    borderRadius: 18,
    marginBottom: 16,
    position: "relative",
  },
  inputFieldContainer: {
    borderColor: "#3A3A3C",
    borderBottomWidth: 2,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  inputFieldContainerSecond: {
    borderColor: "#3A3A3C",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
  },
  pressable: {
    padding: 15,
    paddingLeft: 20,
  },
  border: {
    height: 1,
    backgroundColor: "#3A3A3C",
    marginVertical: -1,
  },
  inputLabel: {
    color: "#666666",
    fontSize: 16,
  },
  swapButton: {
    position: "absolute",
    right: 25,
    top: "50%",
    transform: [{ translateY: -25 }],
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: "#3A3A3C",
    borderWidth: 1,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    backgroundColor: "#2C2C2E",
  },
  swapButtonPressed: {
    backgroundColor: "#2C2C2E",
    borderColor: "#4A4A4C",
  },
});

export default LocationInputs;
