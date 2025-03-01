import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";

import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";

import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      alert("Check your emails!");
    } catch (error: any) {
      console.log(error);
      alert("Registration failed, " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const [secureEntry, setSecureEntry] = useState(true);

  const handleGoBack = () => {
    navigation.goBack();
    // navigation.navigate("Home");
  };

  const handleLogin = () => {
    navigation.navigate("LOGIN");
  };

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons
          name={"arrow-back-outline"}
          color={colors.primary}
          size={25}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Let's get</Text>
        <Text style={styles.headingText}>started</Text>
      </View>

      {/* form  */}

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name={"mail-outline"} size={30} color={colors.secondary} />
          <TextInput
            value={email}
            style={styles.textInput}
            placeholder="Enter your e-mail"
            autoCapitalize="none"
            placeholderTextColor={colors.secondary}
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name={"person-circle-outline"}
            size={30}
            color={colors.secondary}
          />
          <TextInput
            value={userName}
            style={styles.textInput}
            placeholder="Enter your full name"
            placeholderTextColor={colors.secondary}
            onChangeText={(text) => setUserName(text)}
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
            keyboardType="number-pad" // Always set to number-pad
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

        {loading ? (
          <ActivityIndicator size="large" color="#45484A" />
        ) : (
          <>
            <TouchableOpacity
              style={styles.loginButtonWrapper}
              onPress={signUp}
            >
              <Text style={styles.loginText}>Sign up</Text>
            </TouchableOpacity>
          </>
        )}

        <Text style={styles.continueText}>or continue with</Text>

        <TouchableOpacity style={styles.googleButtonContainer}>
          <Image
            source={require("../../assets/google.png")}
            style={styles.googleImage}
          />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>

        {/* footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Already have an account!</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.signupText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
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
