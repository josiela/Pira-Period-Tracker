import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import * as content from "../constants/texts";
import { normalizeH } from "../constants/fontResponsive";

import colors from "../constants/colors";
/**
 * About Us Screen that is called from Settings
 * 
 * @author Aiden <aiden.roessler@haw-hamburg.de>
 * @author Mona <mona.vonhein@haw-hamburg.de> for Finale Style
 * 
 * @param {*} props
 * @returns LateAboutUsScreen
 */

const LateAboutUsScreen = (props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/ueberuns.png")} />
      <Text style={styles.title}>{content.au4}</Text>

      <View style={styles.textBox}>
        <Text style={styles.text}>{content.au3}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: normalizeH(20),
    paddingHorizontal: "7%",
    height: "100%",
    width: "100%",
  },
  title: {
    marginTop: "15%",
    color: colors.accBlue,
    fontSize: normalizeH(10),
    lineHeight: normalizeH(22),
  },

  textBox: {
    marginTop: "2%",
    width: "100%",
    paddingTop: normalizeH(8),
    alignSelf: "flex-start",
  },

  text: {
    lineHeight: normalizeH(9),
    color: colors.mainG,
    fontSize: normalizeH(7),
  },
  logo: {
    alignSelf: "flex-start",
    marginTop: "15%",
    width: normalizeH(40),
    height: normalizeH(35),
  },
});

export default LateAboutUsScreen;
