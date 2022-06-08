import React, { useState } from "react";
import SwipeNavigation from "../SwipeNavigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

// Our Screen Imports
import InfoTextScreen from "../../screens/InfoTextScreen";
import ChangePWScreen from "../../screens/ChangePWScreen";
import MensCycleChangeScreen from "../../screens/MensCycleChangeScreen";
import AboutUsScreen from "../../screens/AboutUsScreen";
import InfoWOButtScreen from "../../screens/InfoWOButtScreen";
import SettingsScreen from "../../screens/SettingsScreen";
import LateAboutUsScreen from "../../screens/LateAboutUsScreen";
import NotificationScreen from "../../screens/NotificationScreen";
import DeleteScreen from "../../screens/DeleteScreen";

const Stack = createNativeStackNavigator();

const SettingStack = () => {
  return (
    <Stack.Navigator name="SettingStack" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="ChangePW" component={ChangePWScreen} />
      <Stack.Screen name="MensundZyklus" component={MensCycleChangeScreen} />
      <Stack.Screen name="LateAboutUs" component={LateAboutUsScreen} />
      <Stack.Screen name="Info" component={InfoWOButtScreen} />
      <Stack.Screen name="Delete" component={DeleteScreen} />
    </Stack.Navigator>
  );
};

export default SettingStack;
