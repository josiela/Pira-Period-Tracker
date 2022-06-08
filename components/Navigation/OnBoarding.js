import React from "react";
import { View, StyleSheet, TextInput, Pressable } from "react-native";
import colors from "../../constants/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LogoScreen from "../../screens/LogoScreen";
import AboutUsScreen from "../../screens/AboutUsScreen";
import InfoTextScreen from "../../screens/InfoTextScreen";
import MensCycleScreen from "../../screens/MensCycleScreen";
import MensCycleChangeScreen from "../../screens/MensCycleChangeScreen";
import EndOfOnBoarding from "../../screens/EndOfOnBoarding";
import CalendarScreen from "../../screens/CalendarScreen";
import ChoosePWScreen from "../../screens/ChoosePwScreen";
import NotificationScreen from "../../screens/NotificationScreen";
import InfoWOButtScreen from "../../screens/InfoWOButtScreen";
/*
This component holds the navigation for the OnBoarding page. 
The functionality is the same as from the SwipeNavigation.
*/

const Tab = createMaterialTopTabNavigator();

const OnBoarding = (props) => {
  return (
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
        name="1"
        component={LogoScreen}
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
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      />
      <Tab.Screen
        name="2"
        component={AboutUsScreen}
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
        name="3"
        component={InfoTextScreen}
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
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      />
          <Tab.Screen
        name="4"
        component={InfoWOButtScreen}
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
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      />
        <Tab.Screen
        name="5"
        component={MensCycleScreen}
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
        name="6"
        component={CalendarScreen}
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
        name="7"
        component={ChoosePWScreen}
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
        name="9"
        children={() => (
          //updateState triggers the updateOnBoarding function one component higher (App.js)
          <EndOfOnBoarding updateState={props.updateOnBoarding} />
        )}
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
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default OnBoarding;
