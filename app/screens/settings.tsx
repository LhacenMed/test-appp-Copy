import React, { useContext } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  useColorScheme,
  StatusBar,
  Pressable,
  View,
  Text,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationProp } from "@react-navigation/native";
import CustomSwitch from "@/components/CustomSwitch";

import { ThemeContext, ThemeMode } from "../../context/ThemeContext";

export default function Page({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const insets = useSafeAreaInsets();
  const themes = useContext(ThemeContext);
  const colorScheme = useColorScheme();

  const backgroundColor = themes.theme === "dark" ? "#121212" : "#fff";
  const headerBackgroundColor = themes.theme === "dark" ? "#121212" : "#fff";
  const menuItemBackgroundColor = themes.theme === "dark" ? "#22272B" : "#fff";
  const textColor = themes.theme === "dark" ? "#fff" : "black";

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
      <View
        style={[
          styles.menuItem,
          !last && styles.menuItemBorder,
          { backgroundColor: menuItemBackgroundColor },
        ]}
      >
        <TouchableOpacity>
          <View style={styles.menuItemContent}>
            <View style={styles.menuItemLeft}>
              <Ionicons
                name={icon}
                size={20}
                color="#666"
                style={styles.menuItemIcon}
              />
              <View style={styles.menuItemTextContainer}>
                <Text style={[styles.menuItemText, { color: textColor }]}>
                  {title}
                </Text>
                {subtitle && (
                  <Text style={styles.menuItemSubtext}>{subtitle}</Text>
                )}
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const ToggleMenuItem = ({
    icon,
    title,
    subtitle,
    last = false,
    value,
    onValueChange,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle: string;
    last?: boolean;
    value: boolean;
    onValueChange: (newValue: boolean) => void;
  }) => {
    return (
      <View
        style={[
          styles.menuItem,
          !last && styles.menuItemBorder,
          { backgroundColor: menuItemBackgroundColor },
        ]}
      >
        <Pressable onPress={() => onValueChange(!value)}>
          <View style={styles.menuItemContent}>
            <View style={styles.menuItemLeft}>
              <Ionicons
                name={icon}
                size={20}
                color="#666"
                style={styles.menuItemIcon}
              />
              <View style={styles.menuItemTextContainer}>
                <Text style={[styles.menuItemText, { color: textColor }]}>
                  {title}
                </Text>
                {subtitle && (
                  <Text style={styles.menuItemSubtext}>{subtitle}</Text>
                )}
              </View>
            </View>
            <CustomSwitch value={value} onValueChange={onValueChange} />
          </View>
        </Pressable>
      </View>
    );
  };

  const handleThemeChange = (mode: ThemeMode) => {
    console.log(`Changing theme to: ${mode}`);
    themes.toggleTheme(mode);
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: headerBackgroundColor }]}>
        <StatusBar
          animated={true}
          barStyle={themes.theme === "dark" ? "light-content" : "dark-content"}
          backgroundColor={
            themes.theme === "dark"
              ? "#121212"
              : themes.theme === "light"
              ? "#fff"
              : colorScheme === "dark"
              ? "#121212"
              : "#fff"
          }
        />
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={{ backgroundColor }}>
        {/* Premium Card */}
        <TouchableOpacity style={styles.premiumCard}>
          <Text style={[styles.premiumTitle]}>Premium Membership 🚀</Text>
          <Text style={styles.premiumSubtitle}>Upgrade for more features</Text>
        </TouchableOpacity>

        {/* Account Section */}
        <View style={[styles.section]}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.sectionContent}>
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
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.sectionContent}>
            <ToggleMenuItem
              icon="language-outline"
              title="Language"
              subtitle="App language"
              value={false}
              onValueChange={() => {}}
            />
            <MenuItem
              icon="card-outline"
              title="Payment method"
              subtitle="Preferred payment method"
            />
            <MenuItem
              icon="contrast-outline"
              title="Theme"
              subtitle="Light, dark mode"
            />
            <MenuItem
              icon="calendar-outline"
              title="Default Booking"
              subtitle="Seats, routes"
              last
            />
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.sectionContent}>
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
          </View>
        </View>

        {/* Legal Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More</Text>
          <View style={styles.sectionContent}>
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
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* Theme Toggle Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Theme</Text>
          <View style={styles.themeToggleContainer}>
            <TouchableOpacity onPress={() => handleThemeChange("light")}>
              <Text style={styles.themeToggleText}>Light</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleThemeChange("dark")}>
              <Text style={styles.themeToggleText}>Dark</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleThemeChange("system")}>
              <Text style={styles.themeToggleText}>System</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
    marginBottom: 30,
    marginTop: 32,
    padding: 16,
    alignItems: "center",
  },
  logoutText: {
    color: "#666",
    fontSize: 16,
  },
  themeToggleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    marginBottom: 90,
  },
  themeToggleText: {
    fontSize: 16,
    color: "#666",
  },
});
