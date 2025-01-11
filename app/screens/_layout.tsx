import React, { useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "../components/TabBar";
import Index from "./index";
import Explore from "./explore";
import Profile from "./profile";
import Settings from "./settings";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <>
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="index" component={Index} />
        <Tab.Screen name="explore" component={Explore} />
        <Tab.Screen name="profile" component={Profile} />
        <Tab.Screen name="settings" component={Settings} />
      </Tab.Navigator>
    </>
  );
}
