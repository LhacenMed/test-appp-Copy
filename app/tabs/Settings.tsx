import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MenuItem from "../components/MenuItem";
import ColorSchemePopup from "../components/ColorSchemePopup";
import LanguagePopup from "../components/LanguagePopup";
import { ThemeContext } from "context/ThemeContext";
import { ThemeMode } from "context/ThemeContext";
import { translations as en } from "../translations/en";
import { translations as fr } from "../translations/fr";
import { translations as ar } from "../translations/ar";
import { translations as es } from "../translations/es";
import { translations as de } from "../translations/de";
import { translations as it } from "../translations/it";

const Page = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const themes = useContext(ThemeContext);

  const translationsMap: Record<string, typeof en> = {
    English: en,
    French: fr,
    Arabic: ar,
    Spanish: es,
    German: de,
    Italian: it,
  };

  const selectedTranslations = translationsMap[selectedLanguage];

  const backgroundColor =
    themes.theme === "dark" ? "#171717" : "rgb(249, 249, 249)";
  const headerTextColor =
    themes.theme === "dark" ? "rgb(249, 249, 249)" : "#171717";

  const handleColorSchemeSelect = (scheme: string) => {
    // Update the theme when a new scheme is selected
    themes.toggleTheme(scheme as ThemeMode);
  };

  const handleLanguageSelect = (language: string) => {
    // Handle language selection logic here
    console.log(`Selected language: ${language}`);
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
            {selectedTranslations.settings}
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
        <Text style={styles.firstSectionTitle}>
          {selectedTranslations.profile}
        </Text>
        <View style={styles.section}>
          <MenuItem
            icon="mail-outline"
            title={selectedTranslations.email}
            value="217acenmed653@gmail.com"
            isFirst
            isLast={false}
            showValue={true}
            showChevron={false}
          />
          <MenuItem
            icon="logo-google"
            title={selectedTranslations.google}
            value="Connected"
            isFirst={false}
            isLast
            showValue={true}
            showChevron={false}
          />
        </View>
        {/* About Section */}
        <Text style={styles.sectionTitle}>{selectedTranslations.about}</Text>
        <View style={styles.section}>
          <MenuItem
            icon="document-text-outline"
            title={selectedTranslations.termsOfUse}
            isFirst
            isLast={false}
          />
          <MenuItem
            icon="shield-outline"
            title={selectedTranslations.privacyPolicy}
            value=""
            isFirst={false}
            isLast={false}
            showValue={true}
            showChevron={true}
          />
          <MenuItem
            icon="information-circle-outline"
            title={selectedTranslations.checkForUpdates}
            value="1.0.11(48)"
            isFirst={false}
            isLast
            showValue={true}
            showChevron={true}
          />
        </View>
        {/* App Section */}
        <Text style={styles.sectionTitle}>{selectedTranslations.app}</Text>
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
            title={selectedTranslations.colorScheme}
            value={themes.mode.charAt(0).toUpperCase() + themes.mode.slice(1)}
            isFirst
            isLast={false}
            showValue={true}
            showChevron={true}
            onPress={() => setModalVisible(true)}
          />
          <MenuItem
            icon="earth"
            title={selectedTranslations.appLanguage}
            value="English"
            isFirst={false}
            isLast
            showValue={true}
            showChevron={true}
            onPress={() => setLanguageModalVisible(true)}
          />
        </View>
        {/* Contact Section */}
        <View style={styles.miniSection}>
          <MenuItem
            icon="chatbubble-outline"
            title={selectedTranslations.contactUs}
            isFirst
            isLast
          />
        </View>
        {/* Danger Zone */}
        <View style={styles.miniSection}>
          <MenuItem
            icon="log-out-outline"
            title={selectedTranslations.logOut}
            isDanger
            isFirst
            showChevron={false}
          />
          <MenuItem
            icon="person-remove-outline"
            title={selectedTranslations.deleteAccount}
            isDanger
            isLast
            showChevron={false}
          />
        </View>
        <Text style={styles.footerText}>{selectedTranslations.footerText}</Text>
      </ScrollView>
      <ColorSchemePopup
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={handleColorSchemeSelect}
      />
      <LanguagePopup
        visible={languageModalVisible}
        onClose={() => setLanguageModalVisible(false)}
        onSelect={handleLanguageSelect}
      />
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
