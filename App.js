import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AppState,
} from "react-native";
import InfoTextScreen from "./screens/InfoTextScreen";
import LogoScreen from "./screens/OnBoarding/LogoScreen";
import MensCycleScreen from "./screens/OnBoarding/MensCycleScreen";
import ChangePWScreen from "./screens/ChangePWScreen";
import StackNavigation from "./components/Navigation/StackNavigation";
import { NavigationContainer } from "@react-navigation/native";

//OnBoarding
import OnBoarding from "./components/Navigation/OnBoarding";
import AboutUsScreen from "./screens/OnBoarding/AboutUsScreen";

/**
 * Pira App
 * Menstruationtracker
 * @author Mona, Josie, Aiden
 * HAW Hamburg - Fakultät DMI
 * Projekt B
 *
 * @returns Pira
 */

//-----HOW THE SWIPE NAVIGATION MUST BE STRUCTURED------//
/*
Swipenavigation must be nested in <NavigationContainer>. That container HAS TO BE in App.js, don't ask me why but
it doesnt want it in the SwipeNavigationContainer
<NavigationContainer>
  <SwipeNavigation></SwipeNavigation>
</NavigationContainer>
*/
const slides = [
  LogoScreen,
  AboutUsScreen,
  ChangePWScreen,
  InfoTextScreen,
  MensCycleScreen,
];

export default function App() {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [showHomePage, setShowHomePage] = useState(false);
  const updateOnBoarding = () => {
    setShowHomePage(true);
  };
  const [currentDate, setCurrentDate] = useState(
    // Timezoneoffset
    new Date().setHours(2, 0, 0, 0)
  );

  useEffect(() => {
    const _handleAppStateChange = AppState.addEventListener(
      "change",
      (nextAppState) => {
        console.log("In App.js. Fetched Date.");
        setCurrentDate(new Date().setHours(0, 0, 0, 0));
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
      }
    );

    return () => {
      _handleAppStateChange.remove();
    };
  }, []);

  // let content = <LoginPWScreen onSavePin={selectedNumber} />;
  if (appStateVisible === "active") {
    if (!showHomePage) {
      return (
        <NavigationContainer>
          <OnBoarding updateOnBoarding={updateOnBoarding}></OnBoarding>
        </NavigationContainer>
      );
    }
    return (
      <NavigationContainer>
        <StackNavigation date={currentDate} />
      </NavigationContainer>
    );
  } else {
    return <LogoScreen />;
  }
}
