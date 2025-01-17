import React from "react";
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import TabBar from "../components/TabBar";
import Index from "./index";
import Explore from "./Explore";
import Profile from "./Bookings";
import Settings from "./Settings";

interface CustomTabNavigationOptions extends BottomTabNavigationOptions {
  blurEnabled?: boolean;
}

const Tab = createBottomTabNavigator<{
  Home: undefined;
  Explore: undefined;
  Bookings: undefined;
  Settings: undefined;
}>();

export default function TabLayout() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Index}
        options={{ blurEnabled: true } as CustomTabNavigationOptions}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{ blurEnabled: true } as CustomTabNavigationOptions}
      />
      <Tab.Screen
        name="Bookings"
        component={Profile}
        options={{ blurEnabled: true } as CustomTabNavigationOptions}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ blurEnabled: true } as CustomTabNavigationOptions}
      />
    </Tab.Navigator>
  );
}
