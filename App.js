import { StatusBar } from "expo-status-bar";
import React from "react";
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
import StackNavigation from "./components/Navigation/StackNavigation";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";

const Stack = createNativeStackNavigator();
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

export default function App() {
  // let content = <LoginPWScreen onSavePin={selectedNumber} />;
  return (
    <NavigationContainer>
      <StackNavigation></StackNavigation>
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
