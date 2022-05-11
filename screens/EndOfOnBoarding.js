import React, { useState } from "react";
import { View, StyleSheet, Image, Alert, Pressable, Text } from "react-native";

import colors from "../constants/colors";

/* 
This is an example page for the last page of the OnBoarding pages. 
Here the transition to the start page is handled (at the moment by a button click). 
This communicates to <OnBoarding>, and from there on to App.js via props
*/
const EndOfOnBoarding = (props) => {

  // onPress triggers the updateState function in OnBoarding
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Pressable style={styles.button1} onPress={props.updateState}>
          <Text style={styles.text}>{props.title}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "50%",
  },
  button: {
    margin: 50,
    elevation: 5,
  },
  text: {
    color: colors.mainLG,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
  },

  button1: {
    borderRadius: 8,
    height: 40,
    elevation: 3,
    backgroundColor: colors.accBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 300,
    height: 200,
  },
});

export default EndOfOnBoarding;
