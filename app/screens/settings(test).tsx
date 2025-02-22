import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
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
import * as MediaLibrary from "expo-media-library";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MenuItem from "../components/MenuItem";
import ColorSchemeModal from "../components/ColorSchemeModal";

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);

  const generatePDF = async () => {
    try {
      // Define your dynamic data
      const userName = "Lhacen Med";
      const userAge = "21";

      // Create an HTML template with dynamic placeholders
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
          <body>
            <h1>Hi ${userName}, you are ${userAge} years old!</h1>
            <p>This is a test of the PDF generation.</p>
          </body>
        </html>
      `;

      // Generate the PDF file
      const file = await(Print as any).printToFileAsync({
        html: htmlContent,
        base64: false,
      });

      // Define the local file path and name
      const localFilePath = `${FileSystem.documentDirectory}custom_document.pdf`;

      // Move the generated PDF to the desired location
      await FileSystem.moveAsync({
        from: file.uri,
        to: localFilePath,
      });

      Alert.alert("PDF Generated", `Saved at: ${localFilePath}`, [
        {
          text: "Open",
          onPress: async () => {
            // Open the PDF file
            await Sharing.shareAsync(localFilePath, {
              mimeType: "application/pdf",
              dialogTitle: "Open PDF",
              UTI: "com.adobe.pdf", // iOS only
            });
          },
        },
        {
          text: "Share",
          onPress: async () => {
            // Share the PDF file
            await (Sharing as any).shareAsync(localFilePath, {
              mimeType: "application/pdf",
              dialogTitle: "Share PDF",
              UTI: "com.adobe.pdf", // iOS only
            });
          },
        },
        { text: "Cancel", style: "cancel" },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to generate PDF.");
      console.error(error);
    }
  };

  const handleColorSchemeSelect = (scheme: string) => {
    console.log("Selected Color Scheme:", scheme);
    // Handle the selected color scheme here
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#171717" />
      <View style={[styles.header, { top: insets.top }]}>
        <View style={styles.headerLeftContainer}>
          <TouchableWithoutFeedback>
            <Icon name="chevron-left" size={28} color="#FFFFFF" />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        <View style={styles.headerRightContainer} />
      </View>

      <ScrollView
        style={[styles.scrollViewContainer, { marginTop: insets.top }]}
        contentContainerStyle={{ paddingTop: 60 }}
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
            icon="moon-outline"
            title="Color Scheme"
            value="System"
            isFirst
            isLast={false}
            showValue={true}
            showChevron={true}
            onPress={() => setModalVisible(true)}
          />
          <MenuItem
            icon="language-outline"
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

        {/* Logout Section */}
        <View style={styles.miniSection}>
          <MenuItem
            icon="log-out-outline"
            title="Log out"
            isFirst
            isLast
            showChevron={false}
          />
        </View>

        {/* Danger Zone */}
        <View style={styles.miniSection}>
          <MenuItem
            icon="trash-outline"
            title="Delete all chats"
            isDanger
            isFirst
            isLast={false}
            showChevron={false}
          />
          <MenuItem
            icon="person-remove-outline"
            title="Delete account"
            isDanger
            isFirst={false}
            isLast
            showChevron={false}
          />
        </View>

        <Text style={styles.footerText}>AI-generated, for reference only</Text>
        <View style={{ marginBottom: 100, paddingHorizontal: 150 }}>
          <Button title="Generate PDF" onPress={generatePDF} />
        </View>

        <ColorSchemeModal
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
    zIndex: 1000,
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
  },
  headerTitle: {
    color: "#FFFFFF",
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
    borderRadius: 17,
    marginBottom: 8,
  },
  miniSection: {
    marginHorizontal: 20,
    backgroundColor: "#2A2A2A",
    borderRadius: 17,
    marginTop: 16,
    marginBottom: 8,
  },
  footerText: {
    color: "#666666",
    fontSize: 12,
    textAlign: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: "#171717",
  },
});

export default ProfileScreen;
