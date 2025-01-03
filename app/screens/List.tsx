import { View, Button, TouchableOpacity, StyleSheet, Text } from "react-native";
import React from "react";
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: RouterProps) => {
  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem("@viewedOnboarding");
    } catch (err) {
      console.log("Error @clearOnboarding: ", err);
    }
  };
  

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        onPress={() => navigation.navigate("Details")}
        title="Open details"
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
        <Text style={{ color: "white" }}>Clear Onboarding</Text>
      </TouchableOpacity>
      <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
    </View>
  );
};

export default List;
