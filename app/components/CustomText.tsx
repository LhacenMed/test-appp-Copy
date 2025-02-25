import React from "react";
import { Text, TextProps } from "react-native";

const CustomText: React.FC<TextProps> = ({ style, children, ...props }) => {
  return (
    <Text
      style={[{ fontFamily: "Outfit-Regular", color: "#fff" }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default CustomText;
