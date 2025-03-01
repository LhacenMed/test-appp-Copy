import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Font from "expo-font";
import CustomText from "@/components/CustomText";
import CustomTouchable from "@/components/CustomTouchable";
import LottieView from "lottie-react-native";

import { fonts } from "../utils/fonts";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../types";

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();

  const [fontsLoaded, setFontsLoaded] = useState(false);

  const [loadingPlatform, setLoadingPlatform] = useState<string | null>(null); // Track loading state for each platform

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = () => {
    navigation.navigate("LOGIN");
  };

  const handleSignup = () => {
    navigation.navigate("SIGNUP");
  };

  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem("@viewedOnboarding");
    } catch (err) {
      console.log("Error @clearOnboarding: ", err);
    }
  };

  useEffect(() => {
    let isMounted = true;
    async function loadFonts() {
      await Font.loadAsync({
        "Outfit-Regular": require("../../assets/fonts/OutfitMedium.ttf"),
      });
      if (isMounted) setFontsLoaded(true);
    }
    loadFonts();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!fontsLoaded) {
    return null; // You can return a loading spinner here
  }

  const handleSocialSignUp = (platform: string) => {
    setLoadingPlatform(platform); // Set the current platform as loading
    console.log(`${platform} sign up pressed`);
    setTimeout(() => {
      setLoadingPlatform(null); // Reset after delay
    }, 2000); // Adjust the delay as needed
  };

  const handleGoogleSignUp = () => {
    console.log("Google sign up pressed");
  };

  const handleAppleSignUp = () => {
    console.log("Apple sign up pressed");
  };

  const handleFacebookSignUp = () => {
    console.log("Facebook sign up pressed");
  };

  const containerStyle = [
    styles.container,
    {
      paddingTop: insets.top,
    },
  ];

  return (
    <SafeAreaView style={containerStyle}>
      <ScrollView>
        <View style={styles.content}>
          <CustomText style={styles.title}>Explore now</CustomText>
          <CustomText style={styles.subtitle}>Join us today.</CustomText>
          <CustomTouchable
            style={[styles.socialButton, styles.googleButton]}
            onPress={() => handleSocialSignUp("Google")}
          >
            {loadingPlatform === "Google" ? (
              <>
                <Image
                  source={require("../../assets/google.png")}
                  style={styles.socialIcon}
                />
                <CustomText style={styles.socialButtonText}>
                  Sign up with Google
                </CustomText>
                <ActivityIndicator
                  size="small"
                  color="#000"
                  style={{ position: "absolute", left: "100%" }}
                />
              </>
            ) : (
              <>
                <Image
                  source={require("../../assets/google.png")}
                  style={styles.socialIcon}
                />
                <CustomText style={styles.socialButtonText}>
                  Sign up with Google
                </CustomText>
              </>
            )}
          </CustomTouchable>
          <CustomTouchable
            style={[styles.socialButton, styles.appleButton]}
            onPress={() => handleSocialSignUp("Apple")}
          >
            {loadingPlatform === "Apple" ? (
              <>
                <Image
                  source={require("../../assets/apple.png")}
                  style={styles.socialIcon}
                />
                <CustomText style={styles.socialButtonText}>
                  Sign up with Apple
                </CustomText>
                <ActivityIndicator
                  size="small"
                  color="#000"
                  style={{ position: "absolute", left: "100%" }}
                />
              </>
            ) : (
              <>
                <Image
                  source={require("../../assets/apple.png")}
                  style={styles.socialIcon}
                />
                <CustomText style={styles.socialButtonText}>
                  Sign up with Apple
                </CustomText>
              </>
            )}
          </CustomTouchable>
          <CustomTouchable
            style={[styles.socialButton, styles.facebookButton]}
            onPress={() => handleSocialSignUp("Facebook")}
          >
            {loadingPlatform === "Facebook" ? (
              <>
                <Image
                  source={require("../../assets/facebook.png")}
                  style={styles.socialIcon}
                />
                <CustomText style={styles.socialButtonText}>
                  Sign up with Facebook
                </CustomText>
                <ActivityIndicator
                  size="small"
                  color="#000"
                  style={{ position: "absolute", left: "100%" }}
                />
              </>
            ) : (
              <>
                <Image
                  source={require("../../assets/facebook.png")}
                  style={styles.socialIcon}
                />
                <CustomText style={styles.socialButtonText}>
                  Sign up with Facebook
                </CustomText>
              </>
            )}
          </CustomTouchable>
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <CustomText style={styles.dividerText}>or</CustomText>
            <View style={styles.divider} />
          </View>
          <CustomTouchable
            style={styles.createAccountButton}
            onPress={handleSignup}
          >
            <CustomText style={styles.createAccountButtonText}>
              Create an account
            </CustomText>
          </CustomTouchable>
          <View style={styles.signInContainer}>
            <CustomText style={styles.signInText}>
              Already have an account?
            </CustomText>
          </View>
          <CustomTouchable style={styles.loginButton} onPress={handleLogin}>
            <CustomText style={styles.loginButtonText}>Login</CustomText>
          </CustomTouchable>
          <CustomText style={styles.termsText}>
            By signing up, you agree to the{" "}
            <CustomText
              style={styles.link}
              onPress={() => console.log("Terms of Service pressed")}
            >
              Terms of Service
            </CustomText>{" "}
            and{" "}
            <CustomText
              style={styles.link}
              onPress={() => console.log("Privacy Policy pressed")}
            >
              Privacy Policy
            </CustomText>
            , including{" "}
            <CustomText
              style={styles.link}
              onPress={() => console.log("Cookie Use pressed")}
            >
              Cookie Use
            </CustomText>
            .
          </CustomText>
          <CustomTouchable
            style={[styles.loginButton, { backgroundColor: "red" }]}
            onPress={clearOnboarding}
          >
            <CustomText style={[styles.loginButtonText, { color: "#fff" }]}>
              Clear Onboarding
            </CustomText>
          </CustomTouchable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 24,
    flex: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 32,
  },
  socialButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e1e1e1",
  },
  googleButton: {
    backgroundColor: "#fff",
  },
  appleButton: {
    backgroundColor: "#fff",
  },
  facebookButton: {
    backgroundColor: "#fff",
  },
  socialIcon: {
    height: 25,
    width: 25,
    marginRight: 15,
  },
  socialButtonText: {
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 27,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#e1e1e1",
  },
  dividerText: {
    fontSize: 15,
    marginHorizontal: 16,
    color: "#000",
    lineHeight: 27,
  },
  createAccountButton: {
    backgroundColor: "#0098FF",
    padding: 20,
    borderRadius: 50,
    alignItems: "center",
  },
  loginButton: {
    padding: 20,
    borderRadius: 50,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e1e1e1",
  },
  createAccountButtonText: {
    color: "#fff",
    fontSize: 20,
    // fontWeight: "600",
    lineHeight: 27,
  },
  loginButtonText: {
    color: "#0098FF",
    fontSize: 20,
    // fontWeight: "600",
    lineHeight: 27,
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 24,
  },
  signInText: {
    color: "#000",
    fontSize: 15,
  },
  termsText: {
    fontSize: 12.5,
    color: "#666",
    textAlign: "center",
    margin: 24,
    lineHeight: 18,
  },
  link: {
    color: "#000",
    textDecorationLine: "underline",
  },
});
