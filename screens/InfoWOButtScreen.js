import React from "react";
import { View, StyleSheet, Text } from "react-native";
import * as content from "../constants/texts";
import { normalizeH } from "../constants/fontResponsive";

import colors from "../constants/colors";
/**
 * InfoText Screen OnBoarding and for Settings
 * 
 * @author Aiden <aiden.roessler@haw-hamburg.de>
 * @author Mona <mona.vonhein@haw-hamburg.de> for responsive Style
 *
 *
 * @param {*} props
 * @returns InfoWOButtScreen
 */

const InfoWOButtScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>über.. </Text>

      <Text style={styles.title2}>Zyklus- und Menstruationslängen</Text>
      <View style={styles.textBox}>
        <Text style={styles.text}>{content.ZuM2}</Text>
        <View style={styles.textBoxQuote}>
          <Text style={styles.textQuote}>{content.ZuM3}</Text>
        </View>
        <Text style={styles.title2}>{content.why3}</Text>
        <View style={styles.textBox}>
          <Text style={styles.text}>{content.why4}</Text>
        </View>
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
    marginBottom: "5%",
    marginTop: "14%",
    color: colors.accBlue,
    fontSize: normalizeH(15),
    lineHeight: normalizeH(22),
  },
  title2: {
    color: colors.accBlue,
    fontSize: normalizeH(7.5),
    lineHeight: normalizeH(12),
  },

  textBox: {
    width: "100%",
    paddingTop: normalizeH(3),
    alignSelf: "flex-start",
  },

  text: {
    lineHeight: normalizeH(9),
    color: colors.mainG,
    fontSize: normalizeH(7.5),
  },

  textBoxQuote: {
    alignContent: "center",
    paddingVertical: 30,
  },

  textQuote: {
    color: colors.accOrange,
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
  },
});

export default InfoWOButtScreen;
