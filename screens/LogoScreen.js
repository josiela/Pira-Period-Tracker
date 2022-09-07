import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { normalize } from "react-native-elements";
import { normalizeH } from "../constants/fontResponsive";

import colors from "../constants/colors";
/**
 * LogoScreen for STARTERS omg. WELCOME
 *
 * takes the Image Source of our Logo and has a future Navigation Component
 *
 * ToDo: Navigation and create a Logo. The Image is a dummy rn.
 *
 * @param {*} props
 * @returns
 */
const LogoScreen = (props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />

      <View style={styles.textBox}>
        <Text style={styles.text}>Willkommen!</Text>
        <Text style={styles.text}>Swipe nach links um loszulegen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
  },
  textBox: {
    justifyContent: "center",
    alignContent: "center",
    marginTop: "30%",
    width: "100%",
    paddingTop: normalizeH(8),
    alignSelf: "flex-start",
  },

  text: {
    textAlign: "center",
    lineHeight: normalizeH(9),
    color: colors.mainG,
    fontSize: normalizeH(7.5),
  },

  logo: {
    alignSelf: "center",
    marginTop: "60%",
    width: normalizeH(89),
    height: normalizeH(85),
  },
});

export default LogoScreen;
