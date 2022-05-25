import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "./constants/colors";
import InfoTextScreen from "./screens/InfoTextScreen";
import LogoScreen from "./screens/LogoScreen";
import ChoosePwScreen from "./screens/ChoosePwScreen";
import CalendarScreen from "./screens/CalendarScreen";
import MensCycleScreen from "./screens/MensCycleScreen";
import SettingsScreen from "./screens/SettingsScreen";
import * as content from "./constants/texts";
import ChangePWScreen from "./screens/ChangePWScreen";
import IndexCircle from "./screens/IndexCircle";
import LoginPWScreen from "./screens/LoginPWScreen";
import SwipeNavigation from "./components/SwipeNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
//OnBoarding
import OnBoarding from "./components/Navigation/OnBoarding";
import AboutUsScreen from "./screens/AboutUsScreen";
import {
  storeMyStringStuff,
  getMyStringStuff,
} from "./database/CreateDatabase";
import { getDefaultLocale } from "react-native-calendars/src/services";
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
//-----------------------------------------------------//

export default function App() {
  // default value true for showing onboarding
  const [openOnBoarding, setOpenOnboarding] = useState("true");

  // wird durch das leere array nur ein einziges Mal ausgeführt
  useEffect(async () => {
    // Wert wird aus Datenbank geholt
    // ob Onboarding angezeigt werden soll oder nicht

    // falls OnBoarding wieder gebraucht wird folgende Zeilen einkommentieren:
    /*
    (async function () {
      // wir setzen den DB Wert entsprechend unserem neuen openOnBoarding Wert
      await storeMyStringStuff("@onboardingValue", openOnBoarding);
    })();
    */
    (async function () {
      let datadata = await getMyStringStuff("@onboardingValue");
      // openOnBoarding wird diesem Wert entsprechend gesetzt
      setOpenOnboarding(datadata);
    })();
  }, []);

  useEffect(() => {
    // wird ausgeführt sobald sich unser openOnBoarding Wert verändert
    // das kann nur geschehen, wenn am Ende der OnBoarding Seiten auf den Button geklickt wird
    (async function () {
      // wir setzen den DB Wert entsprechend unserem neuen openOnBoarding Wert
      await storeMyStringStuff("@onboardingValue", openOnBoarding);
    })();
  }, [openOnBoarding]);

  const updateOnBoarding = () => {
    // Nach klicken des Button wird der OpenOnBoarding Wert auf false gesetzt
    setOpenOnboarding("false");
  };

  // abhängig von unserem openOnBoarding Wert wird die OnBoarding Navigation gezeigt
  if (openOnBoarding == "true") {
    return (
      <NavigationContainer>
        <OnBoarding updateOnBoarding={updateOnBoarding}></OnBoarding>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <SwipeNavigation></SwipeNavigation>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainLG,
    height: "100%",
  },
});
