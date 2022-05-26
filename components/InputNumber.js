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

  const [enteredText, setNumber]= useState('');

  const inputNumberHandler = enteredText =>{
    setNumber(enteredText);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType = 'numeric'
        placeholder="Menstruationslänge"
        placeholderTextColor={colors.primBlue}
        maxLength={2}
        onChangeText={ml => setText(ml)}
        defaultValue={null}
      />
      <TextInput
        style={styles.input}
        keyboardType = 'numeric'
        placeholder="Zykluslänge"
        placeholderTextColor={colors.primBlue}
        maxLength={3}
        onChangeText={zl => setText(zl)}
        defaultValue={null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: "100%",
    //justifyContent: "center",
  },

  input: {
    marginTop:"10%",
    borderBottomColor: colors.mainG,
    borderBottomWidth: 2,
    width: 250,
    height: 70,
    fontSize: normalizeH(8),
  },
});

export default InputNumber;
