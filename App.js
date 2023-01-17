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
import {
  getMyStringStuff,
  storeMyStringStuff,
} from "./database/CreateDatabase";

//OnBoarding
import OnBoarding from "./components/Navigation/OnBoarding";
import AboutUsScreen from "./screens/OnBoarding/AboutUsScreen";
import PasswordCheck from "./screens/PasswordCheck";

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
  const [currentDate, setCurrentDate] = useState(
    // Timezoneoffset
    new Date().setHours(2, 0, 0, 0)
  );
  const [passwordState, setPasswordState] = useState(false);
  const [appBlocked, setAppBlocked] = useState(true);
  const [openOnBoarding, setOpenOnboarding] = useState(true);

  const updateOnBoarding = () => {
    console.log("Passieren hier Dinge?");
    setOpenOnboarding(false);
    storeMyStringStuff("@onboardingBooleanKey", "false");
  };

  const resetOnBoarding = () => {
    setOpenOnboarding(true);
    storeMyStringStuff("@onboardingBooleanKey", "true");
  };

  const getPassword = async () => {
    await getMyStringStuff("@passwordKey").then((returnedValue) => {
      if (returnedValue !== null) {
        setAppBlocked(true);
      } else {
        setAppBlocked(false);
      }
    });
  };

  const unblockApp = () => {
    setAppBlocked(false);
  };

  const getOnboardingValue = async () => {
    await getMyStringStuff("@onboardingBooleanKey").then((returnedValue) => {
      if (returnedValue !== null && returnedValue == "false") {
        setOpenOnboarding(false);
      } else {
        setOpenOnboarding(true);
      }
    });
  };

  useEffect(() => {
    const _handleAppStateChange = AppState.addEventListener(
      "change",
      (nextAppState) => {
        getPassword();
        getOnboardingValue();
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

  if (appStateVisible === "active") {
    if (openOnBoarding) {
      return (
        <NavigationContainer>
          <OnBoarding updateOnBoarding={updateOnBoarding}></OnBoarding>
        </NavigationContainer>
      );
    } else if (!openOnBoarding && appBlocked) {
      return (
        <NavigationContainer>
          <PasswordCheck unblockApp={unblockApp}></PasswordCheck>
        </NavigationContainer>
      );
    } else if (!openOnBoarding && !appBlocked)
      return (
        <NavigationContainer>
          <StackNavigation
            date={currentDate}
            resetOnBoarding={resetOnBoarding}
          />
        </NavigationContainer>
      );
  } else {
    return <LogoScreen />;
  }
}
