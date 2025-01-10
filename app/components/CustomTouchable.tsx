import React, { useRef, useState } from "react";
import {
  TouchableWithoutFeedback,
  Animated,
  StyleProp,
  ViewStyle,
  View,
  StyleSheet,
} from "react-native";

interface CustomTouchableProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const CustomTouchable: React.FC<CustomTouchableProps> = ({
  children,
  style,
  onPress,
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const [isDimmed, setIsDimmed] = useState(false);

  const handlePressIn = () => {
    setIsDimmed(true);
    Animated.timing(scale, {
      toValue: 0.98,
      duration: 70,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsDimmed(false);
    Animated.timing(scale, {
      toValue: 1,
      useNativeDriver: true,
      // friction: 3,
      duration: 100,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View style={[style, { transform: [{ scale }] }]}>
        {children}
        {isDimmed && (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              borderRadius: 50,
            }}
          />
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default CustomTouchable;
