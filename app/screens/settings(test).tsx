import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { NavigationProp } from "@react-navigation/native";

export default function SettingsScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
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
  }) => (
    <TouchableOpacity style={[styles.menuItem, !last && styles.menuItemBorder]}>
      <View style={styles.menuItemContent}>
        <View style={styles.menuItemLeft}>
          <Ionicons
            name={icon}
            size={20}
            color="#666"
            style={styles.menuItemIcon}
          />
          <View style={styles.menuItemTextContainer}>
            <Text style={styles.menuItemText}>{title}</Text>
            {subtitle && <Text style={styles.menuItemSubtext}>{subtitle}</Text>}
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </View>
    </TouchableOpacity>
  );

    const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        {/* Premium Card */}
        <TouchableOpacity style={styles.premiumCard}>
          <Text style={styles.premiumTitle}>Premium Membership</Text>
          <Text style={styles.premiumSubtitle}>Upgrade for more feature</Text>
        </TouchableOpacity>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.sectionContent}>
            <MenuItem
              icon="person-outline"
              title="Profile"
              subtitle="Edit your personal information"
            />
            <MenuItem
              icon="lock-closed-outline"
              title="Password"
              subtitle="Change your password"
            />
            <MenuItem
              icon="notifications-outline"
              title="Notifications"
              subtitle="Manage notification settings"
              last
            />
          </View>
        </View>

        {/* More Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More</Text>
          <View style={styles.sectionContent}>
            <MenuItem
              icon="chatbubble-outline"
              title="Feedback"
              subtitle="Help us improve our app"
            />
            <MenuItem
              icon="help-circle-outline"
              title="Help"
              subtitle="FAQs and support"
              last
            />
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginLeft: 24,
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
    margin: 16,
    marginTop: 32,
    padding: 16,
    alignItems: "center",
  },
  logoutText: {
    color: "#666",
    fontSize: 16,
  },
});
