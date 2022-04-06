import React, { useState } from "react";
import { View, StyleSheet, Alert, Pressable, Text } from "react-native";
import UILogo from "../components/UILogo";
import colors from "../constants/colors";
import Input from "../components/Input";
import * as content from "../constants/texts";

/**
 *  ChangePWScreen!
 *  takes the UILogo & Input Component.
 *  to change Password with some describing Text.
 * 
 * ToDo Styling
 *
 *
 * @param {} props
 * @returns
 */

const ChangePWScreen = (props) => {
  return (
    <View style={styles.container}>
      <UILogo src="lock" />
      
      <Text style={styles.title}>{content.pin1}</Text>
      
      <Text style={styles.text3}>{content.Passwort}</Text>
      
      <View style={styles.inputBox}>
      <Input title={content.pin2} />
      <Input title={content.pin3} />
      <Input title={content.pin4} />
      </View>

      <View style={styles.buttonBox}>
        <Pressable
          style={styles.buttonDesign}
          onPress={() => Alert.alert(content.changeCheck)}
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
    paddingHorizontal: 40,
    paddingVertical: 80,
    justifyContent: "space-between",
  },

  titleBox: {
    color: colors.mainG,
    fontSize: 32,
    lineHeight: 36,
  },

  inputBox:{
    
  },

  title: {
    color: colors.accBlue,
    fontSize: 20,
  },

  text3: {
    color: colors.mainG,
    fontSize: 16,
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

export default ChangePWScreen;
