import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "../components/TabBar";
import IndexScreen from "./index";
import ExploreScreen from "./explore";
import ProfileScreen from "./profile";
import SettingsScreen from "./settings";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const InsideLayout = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />} // Use custom TabBar
      screenOptions={{
        headerShown: false, // Hide header for tabs
      }}
    >
      <Tab.Screen
        name="Home"
        component={IndexScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="compass" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default InsideLayout;
