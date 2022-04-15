import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "./constants/colors";
import InfoTextScreen from "./screens/InfoTextScreen";
import LogoScreen from "./screens/LogoScreen";
import ChoosePwScreen from "./screens/ChoosePwScreen";
import CalendarScreen from "./screens/CalendarScreen";
import NotificationScreen from "./screens/NotificationScreen";
import MensCycleScreen from "./screens/MensCycleScreen";

import * as content from "./constants/texts";
import ChangePWScreen from "./screens/ChangePWScreen";
import AboutUsScreen from "./screens/AboutUsScreen";
import MensCycleChangeScreen from "./screens/MensCycleChangeScreen";
import InfoWOButtScreen from "./screens/InfoWOButtScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Tabs from "./Navigation/tabs";
/**
 * The MASTER APP.
 * We can do it! *peptalk*
 * Note: we still need an Navigation Component and the entire Logic
 *
 * @returns
 */

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainLG,
    height: "100%",
  },
});

/**
 * Just Commentary Dump to test diff Screens with their props.
 * 
 *  <MensCycleScreen title= "Weiter"/>
 *  <LogoScreen title='Press Me'/>
 * <AddEntryScreen/>
 * <NotificationScreen/>
 * <AboutUsScreen header="Über uns" />
 *  <MensCycleChangeScreen header="Menstruations- und Zykluslänge ändern" title="ändern"/>
 * <InfoTextScreen header="Hallo!" title="Weiter"/>
 * <ChoosePwScreen title="Weiter"/>
 * <InfoWOButtScreen header="Did you know.." />
 *   <CalendarScreen
        title="Weiter"
      />
 * <ChangePWScreen title="ändern"/>
 */
