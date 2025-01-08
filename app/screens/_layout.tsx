import React, { useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "../components/TabBar";
import Index from "./index";
import Explore from "./explore";
import Profile from "./profile";
import Settings from "./settings";
import { View } from "react-native";
import BottomSheet from "@/components/BottomSheet";
import { useColorScheme } from "react-native";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
        },
        tabBarActiveTintColor: colorScheme === "dark" ? "#fff" : "#000",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="index" component={Index} />
      <Tab.Screen name="explore" component={Explore} />
      <Tab.Screen name="profile" component={Profile} />
      <Tab.Screen name="settings" component={Settings} />
    </Tab.Navigator>
  );
}
