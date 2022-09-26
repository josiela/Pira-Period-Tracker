import React from "react";
import SwipeNavigation from "../SwipeNavigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";

// Our Screen Imports
import InfoTextScreen from "../../screens/InfoTextScreen";
import ChangePWScreen from "../../screens/ChangePWScreen";
import MensCycleChangeScreen from "../../screens/MensCycleChangeScreen";
import InfoWOButtScreen from "../../screens/InfoWOButtScreen";
import EntryScreen from "../../screens/EntryScreen";
import AddButton from "../AddButton";
import LateAboutUsScreen from "../../screens/LateAboutUsScreen";
import DeleteScreen from "../../screens/DeleteScreen";

/**
 * StackNavigation used by buttons and Settings
 * @author Aiden <aiden.roessler@haw-hamburg.de>
 * @author Josie <joseffa.steuernagel@haw-hamburg.de>
 *
 * @return StackNavigation
 */
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
