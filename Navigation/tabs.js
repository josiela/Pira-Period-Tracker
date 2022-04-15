import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createAppContainer } from "react-navigation";
import React from "react";
import ChangePWScreen from "../screens/ChangePWScreen";
import AboutUsScreen from "../screens/AboutUsScreen";
import MensCycleChangeScreen from "../screens/MensCycleChangeScreen";
import { View, Text, StyleSheet } from "react-native";

const Tab = createMaterialTopTabNavigator();

function Paginator() {
  return (
    <View style={styles.paginator}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.dots}>dot</Text>
        <Text style={styles.dots}>dot</Text>
        <Text style={styles.dots}>dot</Text>
      </View>
    </View>
  );
}

const tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarPosition="bottom"
      initialRoute="history"
      tabBarOptions={{
        showLabel: false,
        indicatorStyle: {
          backgroundColor: "transparent",
        },
      }}
      screenOptions={{
        tabBarIconStyle: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarItemStyle: {
          backgroundColor: "teal",
          width: "100",
          paddingHorizontal: "20px",
        },
        tabBarContentContainerStyle: {
          backgroundColor: "powderblue",
          justifyContent: "center",
        },
      }}
    >
      <Tab.Screen
        name="Pre"
        component={MensCycleChangeScreen}
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
        name="Home"
        component={ChangePWScreen}
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
        name="Settings"
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
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  paginator: {
    //backgroundColor: "#89b2fa",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    elevation: 0,
    height: 60,
  },
  dots: {
    height: 10,
    borderRadius: 10,
    backgroundColor: "#493d8a",
    marginHorizontal: 8,
  },
});

export default tabs;
