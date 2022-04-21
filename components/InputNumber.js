import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import colors from "../constants/colors";

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
   
    width: "80%",
    //justifyContent: "center",
  },

  input: {
    borderBottomColor: colors.mainG,
    borderBottomWidth: 2,
    width: 200,
    height: 50,
    fontSize: 16,
  },
});

export default InputNumber;
