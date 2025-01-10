import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { useEffect, useState, useMemo } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import ForgotPassword from "./app/screens/ForgotPassword";
import LoginScreen from "./app/screens/LoginScreen";
import SignupScreen from "./app/screens/SignupScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Onboarding from "./app/screens/Onboarding";
import { ActivityIndicator, View, StyleSheet } from "react-native";
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
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { ThemeProvider } from './context/ThemeContext';




const Stack = createStackNavigator();
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
      setLoading(false);
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
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
          <StatusBar style={"dark"} />
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={
                user
                  ? "Inside"
                  : viewedOnboarding
                  ? "WelcomeScreen"
                  : "Onboarding"
              }
            >
              {!user ? (
                <>
                  <Stack.Screen
                    name="Onboarding"
                    component={Onboarding}
                    options={{
                      headerShown: false,
                      ...TransitionPresets.SlideFromRightIOS,
                    }}
                  />
                  <Stack.Screen
                    name="WelcomeScreen"
                    component={WelcomeScreen}
                    options={{
                      headerShown: false,
                      ...TransitionPresets.ModalSlideFromBottomIOS,
                    }}
                  />
                  <Stack.Screen
                    name="LOGIN"
                    component={LoginScreen}
                    options={{
                      headerShown: false,
                      ...TransitionPresets.SlideFromRightIOS,
                    }}
                  />
                  <Stack.Screen
                    name="SIGNUP"
                    component={SignupScreen}
                    options={{
                      headerShown: false,
                      ...TransitionPresets.SlideFromRightIOS,
                    }}
                  />
                  <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                    options={{
                      headerShown: true,
                      title: "Forgot Password",
                      ...TransitionPresets.SlideFromRightIOS,
                    }}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen
                    name="Inside"
                    component={InsideLayout}
                    options={{
                      headerShown: false,
                      ...TransitionPresets.SlideFromRightIOS,
                    }}
                  />
                  <Stack.Screen name="Splash" options={{ headerShown: false }}>
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
                  <Stack.Screen
                    name="WelcomeScreen"
                    component={WelcomeScreen}
                    options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
                  />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
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
