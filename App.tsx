import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import List from "./app/screens/List";
import Details from "./app/screens/Details";
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

function InsideLayout() {
  return <TabLayout />;
}


const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

// function InsideLayout() {
//   return (
//     <InsideStack.Navigator>
//       <InsideStack.Screen name="My todos" component={List} />
//       <InsideStack.Screen name="Details" component={Details} />
//     </InsideStack.Navigator>
//   );
// }

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem("@viewedOnboarding");
        setViewedOnboarding(!!value);
      } catch (err) {
        console.log("Error @checkOnboarding: ", err);
      } finally {
        setLoading(false);
      }
    };

    checkOnboarding();
  }, []);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []);

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
            viewedOnboarding ? "LoginSignupScreen" : "Onboarding"
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
            <Stack.Screen
              name="Inside"
              component={InsideLayout}
              options={{ headerShown: false }}
            />
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
