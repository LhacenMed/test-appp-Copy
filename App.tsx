import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import ForgotPassword from "./app/screens/ForgotPassword";
import LoginScreen from "./app/screens/LoginScreen";
import SignupScreen from "./app/screens/SignupScreen";
import LoginSignupScreen from "./app/screens/LoginSignupScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Onboarding from "./app/screens/Onboarding";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { colors } from "./app/utils/colors";
import TabLayout from "./app/screens/_layout";
import Splash from "./app/screens/Splash";

import {
  useFonts,
  Inter_900Black,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import {
  AmaticSC_400Regular,
  AmaticSC_700Bold,
} from "@expo-google-fonts/amatic-sc";

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <>
      <TabLayout />
    </>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [appReady, setAppReady] = useState(false);
  const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    Inter: Inter_400Regular,
    InterSemi: Inter_600SemiBold,
    InterBold: Inter_700Bold,
    InterBlack: Inter_900Black,
    Amatic: AmaticSC_400Regular,
    AmaticBold: AmaticSC_700Bold,
  });

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const value = await AsyncStorage.getItem("@viewedOnboarding");
        if (value !== null) {
          setViewedOnboarding(true);
        }
      } catch (error) {
        console.error("Failed to fetch onboarding status", error);
      } finally {
        setLoading(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      setAppReady(true);
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      setLoading(false); // Update loading to false here
    });
    return unsubscribe;
  }, []);

  if (!appReady || !splashAnimationFinished) {
    return (
      <Splash
        onAnimationFinish={(isCancelled) => {
          if (!isCancelled) {
            setSplashAnimationFinished(true);
          }
        }}
      />
    );
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={
            user
              ? "Inside"
              : viewedOnboarding
              ? "LoginSignupScreen"
              : "Onboarding"
          }
        >
          {!user ? (
            <>
              <Stack.Screen
                name="Onboarding"
                component={Onboarding}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="LoginSignupScreen"
                component={LoginSignupScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="LOGIN"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SIGNUP"
                component={SignupScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{ headerShown: true, title: "Forgot Password" }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Inside"
                component={InsideLayout}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Splash"
                options={{ headerShown: false }}
              >
                {(props) => (
                  <Splash
                    {...props}
                    onAnimationFinish={(isCancelled) => {
                      if (!isCancelled) {
                        setSplashAnimationFinished(true);
                      }
                    }}
                  />
                )}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
