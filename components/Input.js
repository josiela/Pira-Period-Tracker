import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import colors from "../constants/colors";

/**
 * Password Input Component
 * maxLength currently at 8
 * 
 * ToDo: 
 * Style
 * eventually lower the placeholder on the line, so it doesn't hover above it that awkwardly. 
 * Also when toggled/pressed change color mebbe..
 * & Logic ofc.. need to sort the min 4 PIN out 
 * 
 * @param {*} props
 * @returns Component
 */
const Input = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        keyboardType = 'numeric'
        placeholder={props.title}
        placeholderTextColor={colors.primBlue}
        maxLength={8}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    justifyContent: "center",
  },

  input: {
    borderBottomColor: colors.mainG,
    borderBottomWidth: 2,
    width: 200,
    height: 50,
    fontSize: 16,
  },
});

export default Input;
