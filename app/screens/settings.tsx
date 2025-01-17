import React, { useEffect, useRef, useState, useContext } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  useColorScheme,
  StatusBar,
  Switch,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationProp } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import BottomSheet, { BottomSheetMethods } from "@/components/BottomSheet";
import CustomMenuItem from "@/components/CustomMenuItem";
import { EventRegister } from "react-native-event-listeners";
import ThemeContext from "../../theme/themeContext";


export default function Page({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const themes = useContext(ThemeContext);
  const [darkMode, setDarkMode] = useState(false);

  const insets = useSafeAreaInsets();

  const colorScheme = useColorScheme();
  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  const [theme, setTheme] = useState<string | null | undefined>(colorScheme);
  const [themeSwitch, setThemeSwitch] = useState<string>("system");

  useEffect(() => {
    if (themeSwitch === "system") {
      setTheme(colorScheme);
    }
  }, [colorScheme, themeSwitch]);

  const backgroundColorAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme === "dark" ? withTiming("#121212") : withTiming("#fff"),
    };
  });

  const headerBackgroundColorAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme === "dark" ? withTiming("#121212") : withTiming("#e1e1e1"),
    };
  });

  const menuItemBackgroundColorAnimation = useAnimatedStyle(() => {
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

  const MenuItem = ({
    icon,
    title,
    subtitle,
    last = false,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle: string;
    last?: boolean;
  }) => {
    return (
      <Animated.View style={[menuItemBackgroundColorAnimation]}>
        <TouchableOpacity
          style={[styles.menuItem, !last && styles.menuItemBorder]}
        >
          <Animated.View
            style={[styles.menuItemContent, menuItemBackgroundColorAnimation]}
          >
            <Animated.View style={styles.menuItemLeft}>
              <Ionicons
                name={icon}
                size={20}
                color="#666"
                style={styles.menuItemIcon}
              />
              <Animated.View style={styles.menuItemTextContainer}>
                <Animated.Text
                  style={[styles.menuItemText, textColorAnimation]}
                >
                  {title}
                </Animated.Text>
                {subtitle && (
                  <Animated.Text
                    style={[styles.menuItemSubtext, textColorAnimation]}
                  >
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

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <Animated.View style={styles.header}>
        <StatusBar
          animated={true}
          barStyle={theme === "dark" ? "light-content" : "dark-content"}
          backgroundColor={theme === "dark" ? "#000" : "#fff"}
        />
        <Animated.Text style={styles.headerTitle}>Settings</Animated.Text>
      </Animated.View>

      <Animated.ScrollView style={backgroundColorAnimation}>
        {/* Premium Card */}
        <TouchableOpacity style={styles.premiumCard}>
          <Animated.Text style={styles.premiumTitle}>
            Premium Membership 🚀
          </Animated.Text>
          <Animated.Text style={styles.premiumSubtitle}>
            Upgrade for more features
          </Animated.Text>
        </TouchableOpacity>

        {/* Dark Mode Switch */}
        <Switch
          value={darkMode}
          onValueChange={(value) => {
            setDarkMode(value);
            EventRegister.emit("ChangeTheme", value);
          }}
        />

        {/* Account Section */}
        <Animated.View style={[styles.section]}>
            <Animated.Text
              style={[
                styles.sectionTitle,
                ,
                { color: themes.color },
                textColorAnimation,
              ]}
            >
              Account
            </Animated.Text>
          <Animated.View style={styles.sectionContent}>
            <MenuItem
              icon="person-outline"
              title="Profile"
              subtitle="Personal info, picture"
            />
            <MenuItem
              icon="lock-closed-outline"
              title="Password"
              subtitle="Change, reset password"
            />
            <MenuItem
              icon="notifications-outline"
              title="Notifications"
              subtitle="Push, email alerts"
              last
            />
          </Animated.View>
        </Animated.View>

        {/* Preferences Section */}
        <Animated.View style={styles.section}>
          <Animated.Text style={[styles.sectionTitle, textColorAnimation]}>
            Preferences
          </Animated.Text>
          <Animated.View style={styles.sectionContent}>
            <MenuItem
              icon="language-outline"
              title="Language"
              subtitle="App language"
            />

            <MenuItem
              icon="card-outline"
              title="Payment method"
              subtitle="Preferred payment method"
            />
            <CustomMenuItem
              icon="contrast-outline"
              title="Theme"
              subtitle="Light, dark mode"
              bottomSheetRef={bottomSheetRef}
              theme={theme}
            />
            <MenuItem
              icon="calendar-outline"
              title="Default Booking"
              subtitle="Seats, routes"
              last
            />
          </Animated.View>
        </Animated.View>

        {/* Support Section */}
        <Animated.View style={styles.section}>
          <Animated.Text style={[styles.sectionTitle, textColorAnimation]}>
            Support
          </Animated.Text>
          <Animated.View style={styles.sectionContent}>
            <MenuItem
              icon="chatbubble-outline"
              title="Feedback"
              subtitle="Report bugs, suggestions"
            />
            <MenuItem
              icon="help-circle-outline"
              title="Help"
              subtitle="FAQs, guides, contact support"
              last
            />
          </Animated.View>
        </Animated.View>

        {/* Legal Section */}
        <Animated.View style={styles.section}>
          <Animated.Text style={[styles.sectionTitle, textColorAnimation]}>
            More
          </Animated.Text>
          <Animated.View style={styles.sectionContent}>
            <MenuItem
              icon="document-text-outline"
              title="Terms and Conditions"
              subtitle="Usage rules"
            />
            <MenuItem
              icon="shield-checkmark-outline"
              title="Privacy Policy"
              subtitle="Data protection"
              last
            />
          </Animated.View>
        </Animated.View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Animated.Text style={[styles.logoutText, textColorAnimation]}>
            Logout
          </Animated.Text>
        </TouchableOpacity>
        {/* <SystemBars
          animated={true}
          barStyle={theme === "dark" ? "light-content" : "dark-content"}
        /> */}
      </Animated.ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        setTheme={setTheme}
        theme={theme}
        setThemeSwitch={setThemeSwitch}
        themeSwitch={themeSwitch}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  premiumCard: {
    backgroundColor: "#6366F1",
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  premiumTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  premiumSubtitle: {
    color: "#fff",
    opacity: 0.8,
    marginTop: 4,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginLeft: 16,
    marginBottom: 8,
  },
  sectionContent: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
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
  logoutButton: {
    marginBottom: 150,
    marginTop: 32,
    padding: 16,
    alignItems: "center",
  },
  logoutText: {
    color: "#666",
    fontSize: 16,
  },
});
