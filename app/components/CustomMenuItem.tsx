import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { BottomSheetMethods } from "./DesBottomSheet";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  theme: string | null | undefined;
};

const MenuItem = ({
  icon,
  title,
  subtitle,
  last = false,
  bottomSheetRef,
  theme,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  last?: boolean;
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  theme: string | null | undefined;
}) => {

  const backgroundColorAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme === "dark" ? withTiming("#22272B") : withTiming("#fff"),
    };
  });

  const textColorAnimation = useAnimatedStyle(() => {
    return {
      color: theme === "dark" ? withTiming("#fff") : withTiming("black"),
    };
  });

  return (
    <Animated.View style={[backgroundColorAnimation]}>
      <TouchableOpacity
        style={[
          styles.menuItem,
          !last && styles.menuItemBorder,
        ]}
        onPress={() => {
          bottomSheetRef.current?.expand();
        }}
      >
        <Animated.View
          style={[styles.menuItemContent, backgroundColorAnimation]}
        >
          <Animated.View style={styles.menuItemLeft}>
            <Ionicons
              name={icon}
              size={20}
              color="#666"
              style={styles.menuItemIcon}
            />
            <Animated.View style={styles.menuItemTextContainer}>
              <Animated.Text style={styles.menuItemText}>{title}</Animated.Text>
              {subtitle && (
                <Animated.Text style={styles.menuItemSubtext}>
                  {subtitle}
                </Animated.Text>
              )}
            </Animated.View>
          </Animated.View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 20,
  },
  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuItemIcon: {
    marginRight: 12,
  },
  menuItemTextContainer: {
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    color: "#666",
  },
  menuItemSubtext: {
    fontSize: 13,
    color: "#999",
    marginTop: 2,
  },
});
