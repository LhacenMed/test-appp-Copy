import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface MenuItemProps {
  icon?: string;
  title: string;
  value?: string;
  isFirst?: boolean;
  isLast?: boolean;
  isDanger?: boolean;
  onPress?: () => void;
  showValue?: boolean;
  showChevron?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  title,
  value,
  isFirst,
  isLast,
  isDanger,
  onPress,
  showValue = true,
  showChevron = true,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const containerStyle = {
    ...styles.menuItem,
    borderTopLeftRadius: isFirst ? 17 : 0,
    borderTopRightRadius: isFirst ? 17 : 0,
    borderBottomLeftRadius: isLast ? 17 : 0,
    borderBottomRightRadius: isLast ? 17 : 0,
    backgroundColor: isPressed
      ? isDanger
        ? "rgba(255, 0, 0, 0.1)"
        : "rgba(0, 0, 0, 0.1)" // Soft red for danger items
      : "#1E1E1E", // Default background
  };

  const textColor = isDanger ? "#FF4545" : "#FFFFFF";

  return (
    <TouchableWithoutFeedback
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
    >
      <View style={containerStyle}>
        <View style={styles.menuItemLeft}>
          <View style={styles.iconContainer}>
            <Ionicons
              name={icon || ""}
              size={20}
              color={textColor}
              style={styles.icon}
            />
          </View>
          <Text style={[styles.menuItemTitle, { color: textColor }]}>
            {title}
          </Text>
        </View>
        <View style={styles.menuItemRight}>
          {showValue && value && (
            <Text style={styles.menuItemValue}>{value}</Text>
          )}
          {showChevron && (
            <Ionicons name="chevron-forward" size={20} color="#666" />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#2A2A2A",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
  menuItemTitle: {
    fontSize: 14,
  },
  menuItemValue: {
    color: "#666666",
    fontSize: 14,
    marginRight: 8,
  },
  iconContainer: {
    width: 40,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MenuItem;
