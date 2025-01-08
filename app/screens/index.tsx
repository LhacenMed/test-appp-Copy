import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import React from "react";
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
  }
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
      await AsyncStorage.setItem("@viewedOnboarding", "true"); // Optional
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginSignupScreen" }], // Reset stack to login/signup
      });
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text>Home Screen</Text>
      <Button onPress={navigateToSplash} title="Open splash" />
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
