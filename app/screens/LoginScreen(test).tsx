import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Font from "expo-font";
import CustomText from "@/components/CustomText";
import CustomTouchable from "@/components/CustomTouchable";
import LottieView from "lottie-react-native";

import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../types";





import { FIREBASE_AUTH } from "../../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

export default function WelcomeScreen() {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
    const signIn = async () => {
      setLoading(true);
      try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response);
      } catch (error: any) {
        console.log(error);
        alert("Sign in failed, " + error.message);
      } finally {
        setLoading(false);
      }
    };
  
    const [secureEntry, setSecureEntry] = useState(true);
  
    const handleGoBack = () => {
      navigation.goBack();
    };
    const handleSignup = () => {
      navigation.navigate("SIGNUP");
    };







  const insets = useSafeAreaInsets();

  const [fontsLoaded, setFontsLoaded] = useState(false);

  const [loadingPlatform, setLoadingPlatform] = useState<string | null>(null); // Track loading state for each platform

  const handleLogin = () => {
    navigation.navigate("LOGIN");
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
    setLoadingPlatform(platform);
    console.log(`${platform} sign up pressed`);
    setTimeout(() => {
      setLoadingPlatform(null);
    }, 5000);
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




          <View style={styles.formContainer}>
                  <View style={styles.inputContainer}>
                    <Ionicons name={"mail-outline"} size={30} color={colors.secondary} />
                    <TextInput
                      value={email}
                      style={styles.textInput}
                      placeholder="Enter your email"
                      autoCapitalize="none"
                      placeholderTextColor={colors.secondary}
                      keyboardType="email-address"
                      onChangeText={(text) => setEmail(text)}
                    />
                  </View>
          
                  <View style={styles.inputContainer}>
                    <SimpleLineIcons name={"lock"} size={30} color={colors.secondary} />
                    <TextInput
                      value={password}
                      style={styles.textInput}
                      placeholder="Enter your password"
                      placeholderTextColor={colors.secondary}
                      onChangeText={(text) => setPassword(text)}
                      secureTextEntry={secureEntry}
                      keyboardType="number-pad"
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setSecureEntry((prev) => !prev);
                      }}
                    >
                      <Ionicons
                        name={secureEntry ? "eye" : "eye-off"}
                        size={20}
                        color={colors.secondary}
                      />
                    </TouchableOpacity>
                  </View>
          
                  <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                  </TouchableOpacity>
          
                  {loading ? (
                    <ActivityIndicator size="large" color="#000" />
                  ) : (
                    <>
                      <TouchableOpacity
                        style={styles.loginButtonWrapper}
                        onPress={signIn}
                      >
                        <Text style={styles.loginText}>Login</Text>
                      </TouchableOpacity>
                    </>
                  )}
          
                  <Text style={styles.continueText}>or continue with</Text>
          
                  <TouchableOpacity style={styles.googleButtonContainer}>
                    <Image
                      source={require("../../assets/google.png")}
                      style={{ height: 20, width: 20 }}
                    />
                    <Text style={styles.googleText}>Google</Text>
                  </TouchableOpacity>
          
                  {/* footer */}
                  <View style={styles.footerContainer}>
                    <Text style={styles.accountText}>Don’t have an account?</Text>
                    <TouchableOpacity onPress={handleSignup}>
                      <Text style={styles.signupText}>Sign up</Text>
                    </TouchableOpacity>
                  </View>
                </View>





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
              Already have an account?{" "}
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
            <CustomText style={[styles.loginButtonText, { color: "white" }]}>
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
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colors.gray,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    color: colors.primary,
    fontFamily: fonts.SemiBold,
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: fonts.Light,
  },
  forgotPasswordText: {
    textAlign: "right",
    color: colors.primary,
    fontFamily: fonts.SemiBold,
    marginVertical: 10,
  },
  loginButtonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    marginTop: 20,
  },
  loginText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    textAlign: "center",
    padding: 10,
  },
  continueText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 14,
    fontFamily: fonts.Regular,
    color: colors.primary,
  },
  googleButtonContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  googleImage: {
    height: 20,
    width: 20,
  },
  googleText: {
    fontSize: 20,
    fontFamily: fonts.SemiBold,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: colors.primary,
    fontFamily: fonts.Regular,
  },
  signupText: {
    color: colors.primary,
    fontFamily: fonts.Bold,
    textDecorationLine: "underline",
  },
});
