import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { NavigationProp } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Page = ({ navigation }: RouterProps) => {
  const navigateToSplash = () => {
    navigation.navigate("Splash");
  };
  const navigateToWelcomeScreen = () => {
    navigation.navigate("WelcomeScreen");
  };
  const navigateToLoginScreenTest = () => {
    navigation.navigate("LoginScreenTest");
  };
  const navigateToSettingsScreenTest = () => {
    navigation.navigate("SettingsScreen");
  };
  const navigateToTrips = () => {
    navigation.navigate("TripsScreen");
  };
  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem("@viewedOnboarding");
    } catch (err) {
      console.log("Error @clearOnboarding: ", err);
    }
  };

  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      await AsyncStorage.setItem("@viewedOnboarding", "true");
      navigation.reset({
        index: 0,
        routes: [{ name: "WelcomeScreen" }],
      });
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: "#fff" }]}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.headerTitle}>Explore</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Explore Screen</Text>
        <Button onPress={navigateToTrips} title="View My Trips" />
        <Button onPress={navigateToSplash} title="Open splash" />
        <Button onPress={navigateToWelcomeScreen} title="Open welcome screen" />
        <Button
          onPress={navigateToLoginScreenTest}
          title="Open Login screen (test)"
        />
        <Button
          onPress={navigateToSettingsScreenTest}
          title="Open Settings screen (test)"
        />
        <TouchableOpacity
          onPress={clearOnboarding}
          style={{
            backgroundColor: "red",
            borderRadius: 6,
            marginTop: 50,
            marginBottom: 50,
            padding: 10,
          }}
        >
          <Text style={{ color: "#fff" }}>Clear Onboarding</Text>
        </TouchableOpacity>
        <Button onPress={handleLogout} title="Logout" />
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#fff",
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
  clearOnboarding: {
    backgroundColor: "red",
    borderRadius: 6,
    marginTop: 50,
    padding: 10,
  },
});
