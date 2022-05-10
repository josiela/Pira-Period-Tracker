import React, { useState } from "react";
import SwipeNavigation from "../SwipeNavigation";
import InfoTextScreen from "../../screens/InfoTextScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

const StackNavigation = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={SwipeNavigation} />
      <Stack.Screen name="Next page" component={InfoTextScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
