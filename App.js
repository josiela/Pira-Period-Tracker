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
import IndexCal from "./screens/IndexCal";
import IndexCircle from "./screens/IndexCircle";
import LoginPWScreen from "./screens/LoginPWScreen";
/**
 * The MASTER APP.
 * We can do it! *peptalk*
 * Note: we still need an Navigation Component and the entire Logic
 *
 * @returns
 */
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  // let content = <LoginPWScreen onSavePin={selectedNumber} />;
  return (
    <NavigationContainer>
      {/* Rest of your app code */}
      <Tab.Navigator
        style={{ backgroundColor: colors.mainLG }}
        tabBarPosition={"bottom"}
        screenOptions={{
          tabBarStyle: { backgroundColor: colors.mainLG },
          tabBarShowLabel: false,
          tabBarIndicatorStyle: {
            backgroundColor: "transparent",
          },
          tabBarIconStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarItemStyle: {
            //color of item-object
            backgroundColor: "transparent",
            width: 30,
            paddingHorizontal: 1,
          },
          tabBarContentContainerStyle: {
            //total backgroundcolor of bar
            backgroundColor: "transparent",
            justifyContent: "center",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={IndexCal}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 10,
                  backgroundColor: focused ? "#493d8a" : "#748c94",
                }}
              />
            ),
            tabBarIconStyle: {
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            },
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 10,
                  backgroundColor: focused ? "#493d8a" : "#748c94",
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Seite3"
          component={ChoosePwScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 10,
                  backgroundColor: focused ? "#493d8a" : "#748c94",
                }}
              />
            ),
            tabBarIconStyle: {
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
            },
          }}
        />
      </Tab.Navigator>
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
