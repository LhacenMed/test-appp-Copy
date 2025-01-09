import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { NavigationProp } from "@react-navigation/native";

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
        routes: [{ name: "LoginSignupScreen" }],
      });
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button onPress={navigateToSplash} title="Open splash" />
      <Button onPress={navigateToWelcomeScreen} title="Open welcome screen" />
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
        <Text style={{ color: "white" }}>Clear Onboarding</Text>
      </TouchableOpacity>
      <Button onPress={handleLogout} title="Logout" />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  clearOnboarding: {
    backgroundColor: "red",
    borderRadius: 6,
    marginTop: 50,
    padding: 10,
  },
});
