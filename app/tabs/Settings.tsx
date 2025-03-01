import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MenuItem from "../components/MenuItem";
import ColorSchemePopup from "../components/ColorSchemePopup";
import { ThemeContext } from "context/ThemeContext";
import { ThemeMode } from "context/ThemeContext";

const Page = () => {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const themes = useContext(ThemeContext);

  const backgroundColor =
    themes.theme === "dark" ? "#171717" : "rgb(249, 249, 249)";
  const headerTextColor =
    themes.theme === "dark" ? "rgb(249, 249, 249)" : "#171717";

  const handleColorSchemeSelect = (scheme: string) => {
    // Update the theme when a new scheme is selected
    themes.toggleTheme(scheme as ThemeMode);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={themes.theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={
          themes.theme === "dark" ? "#171717" : "rgb(249, 249, 249)"
        }
      />
      <View
        style={[
          styles.header,
          { top: insets.top, backgroundColor: backgroundColor },
        ]}
      >
        <View style={styles.headerLeftContainer} />
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, { color: headerTextColor }]}>
            Settings
          </Text>
        </View>
        <View style={styles.headerRightContainer} />
      </View>

      <ScrollView
        style={[
          styles.scrollViewContainer,
          { top: insets.top, backgroundColor: backgroundColor },
        ]}
        contentContainerStyle={{ paddingTop: 60 }}
        scrollEnabled={!modalVisible}
      >
        {/* Profile Section */}
        <Text style={styles.firstSectionTitle}>Profile</Text>
        <View style={styles.section}>
          <MenuItem
            icon="mail-outline"
            title="Email"
            value="217acenmed653@gmail.com"
            isFirst
            isLast={false}
            showValue={true}
            showChevron={false}
          />
          <MenuItem
            icon="logo-google"
            title="Google"
            value="Connected"
            isFirst={false}
            isLast
            showValue={true}
            showChevron={false}
          />
        </View>
        {/* About Section */}
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.section}>
          <MenuItem
            icon="document-text-outline"
            title="Terms of Use"
            isFirst
            isLast={false}
          />
          <MenuItem
            icon="shield-outline"
            title="Privacy Policy"
            value=""
            isFirst={false}
            isLast={false}
            showValue={true}
            showChevron={true}
          />
          <MenuItem
            icon="information-circle-outline"
            title="Check for updates"
            value="1.0.11(48)"
            isFirst={false}
            isLast
            showValue={true}
            showChevron={true}
          />
        </View>
        {/* App Section */}
        <Text style={styles.sectionTitle}>App</Text>
        <View style={styles.section}>
          <MenuItem
            icon={
              themes.mode === "system"
                ? themes.theme === "dark"
                  ? "moon-outline"
                  : "sunny-outline"
                : themes.mode === "dark"
                ? "moon-outline"
                : "sunny-outline"
            }
            title="Color Scheme"
            value={themes.mode.charAt(0).toUpperCase() + themes.mode.slice(1)}
            isFirst
            isLast={false}
            showValue={true}
            showChevron={true}
            onPress={() => setModalVisible(true)}
          />
          <MenuItem
            icon="earth"
            title="App Language"
            value="English"
            isFirst={false}
            isLast
            showValue={true}
            showChevron={true}
          />
        </View>
        {/* Contact Section */}
        <View style={styles.miniSection}>
          <MenuItem
            icon="chatbubble-outline"
            title="Contact us"
            isFirst
            isLast
          />
        </View>
        {/* Danger Zone */}
        <View style={styles.miniSection}>
          <MenuItem
            icon="log-out-outline"
            title="Log out"
            isDanger
            isFirst
            showChevron={false}
          />
          <MenuItem
            icon="person-remove-outline"
            title="Delete account"
            isDanger
            isLast
            showChevron={false}
          />
        </View>
        <Text style={styles.footerText}>AsfarGo 2025 - All rights reserved.</Text>
        <ColorSchemePopup
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSelect={handleColorSchemeSelect}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    paddingTop: 5,
    backgroundColor: "#171717",
    zIndex: 1,
    elevation: 3,
  },
  headerLeftContainer: {
    width: 28,
    alignItems: "flex-start",
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerRightContainer: {
    width: 28,
    alignItems: "flex-end",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  firstSectionTitle: {
    color: "#666666",
    fontSize: 12,
    marginLeft: 35,
    marginBottom: 8,
  },
  sectionTitle: {
    color: "#666666",
    fontSize: 12,
    marginLeft: 35,
    marginTop: 16,
    marginBottom: 8,
  },
  section: {
    marginHorizontal: 20,
    backgroundColor: "#2A2A2A",
    borderRadius: 18,
    marginBottom: 8,
  },
  miniSection: {
    marginHorizontal: 20,
    backgroundColor: "#2A2A2A",
    borderRadius: 18,
    marginTop: 16,
    marginBottom: 8,
  },
  footerText: {
    color: "#666666",
    fontSize: 12,
    textAlign: "center",
    marginTop: 24,
    marginBottom: 130,
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: "#171717",
  },
});

export default Page;
