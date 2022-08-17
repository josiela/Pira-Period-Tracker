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
import IndexCal from "../../screens/IndexCal";
import SettingStack from "./SettingStack";
import EntryScreen from "../../screens/EntryScreen";
import AddButton from "../AddButton";
import NotificationScreen from "../../screens/NotificationScreen";
import LateAboutUsScreen from "../../screens/LateAboutUsScreen";
import DeleteScreen from "../../screens/DeleteScreen";

const Stack = createNativeStackNavigator();

const StackNavigation = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="home"
        children={() => (
          //updateState triggers the updateOnBoarding function one component higher (App.js)
          <SwipeNavigation date={props.date} />
        )}
      />
      <Stack.Screen name="Next page" component={InfoTextScreen} />
      <Stack.Screen name="ChangePW" component={ChangePWScreen} />
      <Stack.Screen name="MensundZyklus" component={MensCycleChangeScreen} />
      <Stack.Screen name="LateAboutUs" component={LateAboutUsScreen} />
      <Stack.Screen name="Info" component={InfoWOButtScreen} />
      <Stack.Screen name="AddButton" component={AddButton} />
      <Stack.Screen name="AddEntryScreen" component={EntryScreen} />
      <Stack.Screen name="DeleteScreen" component={DeleteScreen} />
    </Stack.Navigator>
  );
};
//<Stack.Screen name="home" component={SwipeNavigation} />
export default StackNavigation;
