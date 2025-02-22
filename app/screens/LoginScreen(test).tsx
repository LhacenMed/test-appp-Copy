"use client";

import { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { Input, Button } from "@rneui/themed";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import * as NavigationBar from "expo-navigation-bar";


const { width } = Dimensions.get("window");

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Enable edge-to-edge mode to see content behind the navigation bar
    NavigationBar.setPositionAsync('absolute');
    // Set transparent background
    NavigationBar.setBackgroundColorAsync('#ffffff00');
  }, []);

  async function signInWithEmail() {
    setLoading(true);
    const { error }: any = {};

    if (error) Alert.alert("Error", error.message);
    else Alert.alert("Success", "Check your email for the confirmation link!");
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { error }: any = {};

    if (error) Alert.alert("Error", error.message);
    else Alert.alert("Success", "Check your email for the confirmation link!");
    setLoading(false);
  }

  // SystemNavigationBar.lowProfile();

  return (
    <>
      <StatusBar hidden={false} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <Animated.View
          entering={FadeInUp.delay(200).duration(1000)}
          style={styles.logoContainer}
        >
          <Image
            source={{ uri: "https://placekitten.com/200/200" }}
            style={styles.logo}
          />
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(400).duration(1000)}
          style={styles.formContainer}
        >
          <Input
            placeholder="Email"
            leftIcon={{ type: "font-awesome", name: "envelope" }}
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Input
            placeholder="Password"
            leftIcon={{ type: "font-awesome", name: "lock" }}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            autoCapitalize="none"
          />
          <Button
            title="Sign In"
            onPress={signInWithEmail}
            loading={loading}
            containerStyle={styles.buttonContainer}
          />
          <Button
            title="Sign Up"
            onPress={signUpWithEmail}
            loading={loading}
            containerStyle={styles.buttonContainer}
            type="outline"
          />
        </Animated.View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: (width * 0.4) / 2,
  },
  formContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
