import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "../components/TabBar";
import Index from "./index";
import Explore from "./Explore";
import Profile from "./Bookings";
import Settings from "./Settings";

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
        <Tab.Screen name="Home" component={Index} />
        <Tab.Screen name="Explore" component={Explore} />
        <Tab.Screen name="Bookings" component={Profile} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </>
  );
}
