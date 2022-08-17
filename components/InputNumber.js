import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import colors from "../constants/colors";
import { normalizeH } from "../constants/fontResponsive";

/**
 * Input Component 
 * numbers only to gain information about f.e. cycle length and menstruation length
 
 * 
 * @param {*} props
 * @returns Component
 */
const InputNumber = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="numeric"
        placeholder={props.title}
        placeholderTextColor={colors.primBlue}
        maxLength={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "30%",
    width: "100%",
    //justifyContent: "center",
  },

  input: {
    borderBottomColor: colors.mainG,
    borderBottomWidth: 2,
    width: 250,
    height: 35,
    fontSize: normalizeH(8),
  },
});

export default InputNumber;
