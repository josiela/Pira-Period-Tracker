import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import colors from "../constants/colors";
import { normalizeH } from "../constants/fontResponsive";

/**
 * Password Input Component
 * maxLength currently at 8
 *
 * @author Aiden <aiden.roessler@haw-hamburg.de>
 * @author Mona <mona.vonhein@haw-hamburg.de> for final style
 *
 * @param {*} props
 * @returns Component
 */
const Input = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        style={styles.input}
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="numeric"
        placeholder={props.title}
        placeholderTextColor={colors.primBlue}
        maxLength={8}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  input: {
    marginTop: "10%",
    borderBottomColor: colors.mainG,
    borderBottomWidth: 2,
    width: 250,
    height: 40,
    fontSize: normalizeH(7.5),
  },
});

export default Input;
