import React, { useState } from "react";
import { View, StyleSheet, Alert, Pressable, Text } from "react-native";
import UILogo from "../components/UILogo";
import colors from "../constants/colors";
import Input from "../components/Input";
import * as content from "../constants/texts";

/**
 *  ChoosePwScreen for Starters!
 *  takes the UILogo & Input Component.
 *
 *
 * ToDo: Navigation Bar
 * may find another solution for the marked Dates, it's just a dummy rn
 * also find a way to get the input outta it but that's prob. a diff issue
 * 
 * STYLE <3
 *
 * @param {} props
 * @returns
 */

const ChoosePwScreen = (props) => {
  return (
    <View style={styles.container}>
      <UILogo src="lock" />
      <View style={styles.title}>
        <Text style={styles.text}>{content.start7}</Text>
        <View style={styles.inputBox}>
          <Input title="Passwort" />
          <Input title="Wiederholen" />
        </View>
      </View>

      <View style={styles.buttonBox}>
        <Pressable
          style={styles.buttonDesign}
          onPress={() => Alert.alert("am pressed omg")}
        >
          <Text style={styles.textButton}>{props.title}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 60,
    paddingVertical: 80,
    justifyContent: "space-between",
  },
  title: {
    color: colors.mainG,
    marginTop: 40,
    fontSize: 32,
    lineHeight: 36,
  },

  inputBox: {},

  text: {
    color: colors.mainG,
    fontSize: 20,
  },

  //Button Styles
  buttonBox: {
    elevation: 5,
    alignItems: "center",
  },
  textButton: {
    color: colors.mainLG,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
  },

  buttonDesign: {
    borderRadius: 8,
    height: 40,
    width: 80,
    elevation: 3,
    backgroundColor: colors.accBlue,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChoosePwScreen;
