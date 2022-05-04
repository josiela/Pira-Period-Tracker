import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../constants/colors";
import TextWSwitch from "../components/TextWSwitch";


/**
 *  NotificationScreen for Starters! and for the Settings.. it can be recycled I guess? *cool*
 * takes the TextWSwitch Component and asks if Notifications are acceptable
 *
 * TODo Figure out how you can reuse the component and hand over the texts..
 * and how to safe the state and all..
 * 
 *
 *
 * @param {} props
 * @returns
 */

const NotificationScreen = (props) => {
  return (
    
      <View style={styles.head}>
        <Text style={styles.title}>Benachrichtigungen</Text>
        <View style={styles.container}>
        <TextWSwitch />
        </View>
       
      </View>
  
  );
};

const styles = StyleSheet.create({
  head:{
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 60,
    paddingVertical: 80,
    justifyContent: 'flex-start',
  },
  container: {
  paddingVertical:20,
  },
  title: {
    color: colors.accBlue,
    marginTop: 40,
    fontSize: 30,
    lineHeight: 36,
  },
});

export default NotificationScreen;
