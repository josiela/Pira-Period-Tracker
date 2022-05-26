import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "./constants/colors";
import InfoTextScreen from "./screens/InfoTextScreen";
import LogoScreen from "./screens/LogoScreen";
import ChoosePwScreen from "./screens/ChoosePwScreen";
import CalendarScreen from "./screens/CalendarScreen";
import MensCycleScreen from "./screens/MensCycleScreen";
import EntryScreen from "./screens/EntryScreen";
import SettingsScreen from "./screens/SettingsScreen";
import * as content from "./constants/texts";
import ChangePWScreen from "./screens/ChangePWScreen";
import IndexCircle from "./screens/IndexCircle";
import LoginPWScreen from "./screens/LoginPWScreen";
import SwipeNavigation from "./components/SwipeNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MonasPasswordCheck from "./screens/MonasPasswordCheck";
//OnBoarding
import OnBoarding from "./components/Navigation/OnBoarding";
import AboutUsScreen from "./screens/AboutUsScreen";
import MonasChangePwScreen from "./screens/MonasPasswordCheck";
/**
 * The MASTER APP.
 * We can do it! *peptalk*
 * Note: we still need an Navigation Component and the entire Logic
 *
 * @returns
 */

//-----HOW THE SWIPE NAVIGATION MUST BE STRUCTURED------//
/*
Swipenavigation must be nested in <NavigationContainer>. That container HAS TO BE in App.js, don't ask me why but
it doesnt want it in the SwipeNavigationContainer
<NavigationContainer>
  <SwipeNavigation></SwipeNavigation>
</NavigationContainer>
*/
const slides = [LogoScreen, AboutUsScreen, InfoTextScreen, MensCycleScreen];

export default function App() {
  const [showHomePage, setShowHomePage] = useState(false);
  const updateOnBoarding = () => {
    console.log("Du bist ganz oben angekommen!");
    setShowHomePage(true);
  };
  // let content = <LoginPWScreen onSavePin={selectedNumber} />;
  if (!showHomePage) {
    return (
      <NavigationContainer>
        <OnBoarding updateOnBoarding={updateOnBoarding}></OnBoarding>
      </NavigationContainer>
    );
  }

  return (
    <View style={styles.container}>
      <MonasPasswordCheck/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainLG,
    height: "100%",
  },
});

/**
<<<<<<< HEAD
 * Just Commentary Dump to test diff Screens with their props.
 *  <MensCycleScreen title= "Weiter"/>
 *  <LogoScreen title='Press Me'/>
 * <NotificationScreen/>
 * <InfoTextScreen header="Hallo!" title="Weiter"/>
 * <ChoosePwScreen title="Weiter"/>
 *  <CalendarScreen
        header="Wann hattest du deine letzte Menstruation?"
        title="Weiter"
      />
 * <ChangePWScreen title="ändern"/>
 */
