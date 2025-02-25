import { ThemeContext } from "context/ThemeContext";
import React, { useContext, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Haptic from "expo-haptics";

interface MenuItemProps {
  icon?: string;
  title: string;
  subtitle?: string;
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
  subtitle,
  value,
  isFirst,
  isLast,
  isDanger,
  onPress,
  showValue = true,
  showChevron = true,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const themes = useContext(ThemeContext);

  const backgroundColor = themes.theme === "dark" ? "#1E1E1E" : "#ffffff";
  const dimBackgroundColor =
    themes.theme === "dark" ? "#2A2A2A" : "rgb(241, 241, 241)";
  const dangerDimBackgroundColor =
    themes.theme === "dark" ? "#2A1F1F" : "#FFE8E8";
  const borderBottomColor =
    themes.theme === "dark" ? "#404040" : "rgb(210, 210, 210)";
  const normalTextColor = themes.theme === "dark" ? "#ffffff" : "#171717";
  const dangerTextColor = themes.theme === "dark" ? "#FF4545" : "#FF4545";
  const valueTextColor =
    themes.theme === "dark" ? "#666666" : "rgb(142, 142, 142)";
  const chevronColor =
    themes.theme === "dark" ? "#666666" : "rgb(142, 142, 142)";

  const handlePressIn = () => {
    setIsPressed(true);
    if (isDanger) {
      Haptic.selectionAsync();
    }
    Animated.timing(fadeAnim, {
      toValue: 1,
      useNativeDriver: false,
      duration: 0,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.timing(fadeAnim, {
      toValue: 0,
      useNativeDriver: false,
      duration: 200,
    }).start();
  };

  const animatedBackgroundColor = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      backgroundColor,
      isDanger ? dangerDimBackgroundColor : dimBackgroundColor,
    ],
  });

  const containerStyle = {
    ...styles.menuItem,
    borderTopLeftRadius: isFirst ? 17 : 0,
    borderTopRightRadius: isFirst ? 17 : 0,
    borderBottomLeftRadius: isLast ? 17 : 0,
    borderBottomRightRadius: isLast ? 17 : 0,
    borderBottomWidth: isLast ? 0 : 1,
    borderBottomColor: borderBottomColor,
    backgroundColor: animatedBackgroundColor,
  };

  const textColor = isDanger ? dangerTextColor : normalTextColor;

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View style={containerStyle}>
        <View style={styles.menuItemLeft}>
          <View style={styles.iconContainer}>
            <Ionicons
              name={icon || ""}
              size={20}
              color={textColor}
              style={styles.icon}
            />
          </View>
          <View>
            <Text style={[styles.menuItemTitle, { color: textColor }]}>
              {title}
            </Text>
            {subtitle && (
              <Text style={styles.menuItemSubtitle}>{subtitle}</Text>
            )}
          </View>
        </View>
        <View style={styles.menuItemRight}>
          {showValue && value && (
            <Text style={[styles.menuItemValue, { color: valueTextColor }]}>
              {value}
            </Text>
          )}
          {showChevron && (
            <Ionicons name="chevron-forward" size={20} color={chevronColor} />
          )}
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#2A2A2A",
    borderBottomWidth: 1,
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
  menuItemSubtitle: {
    fontSize: 12,
    marginTop: 4,
    color: "#AAAAAA",
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
