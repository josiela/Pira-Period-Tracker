import React, { useState } from "react";
import { View } from "react-native";
import colors from "../constants/colors";
import IndexCal from "../screens/IndexCal";
import SettingsScreen from "../screens/SettingsScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import IndexCircle from "../screens/IndexCircle";

const Tab = createMaterialTopTabNavigator();

const SwipeNavigation = (props) => {
  return (
    <Tab.Navigator
      style={{ backgroundColor: colors.mainLG }}
      tabBarPosition={"bottom"}
      initialRouteName="Circle"
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
          tabBarIconStyle: {
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          },
        }}
      />
      <Tab.Screen
        name="Circle"
        children={() => (
          //updateState triggers the updateOnBoarding function one component higher (App.js)
          <IndexCircle date={props.date} />
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
      <Tab.Screen
        name="Calendar"
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
            alignItems: "flex-start",
            justifyContent: "center",
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default SwipeNavigation;
