import React from "react";
import { View, StyleSheet, Text } from "react-native";
import * as content from "../constants/texts";
import { normalizeH } from "../constants/fontResponsive";

import colors from "../constants/colors";
/**
 * InfoTextScreen for Starters!
 * takes the Navigation Component and a WoT
 *
 *
 * ToDo: Navigation Bar
 * Decide on a diff Font?
 *
 * @param {*} props
 * @returns
 */

const InfoTextScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{content.Datenschutz5}</Text>

      <View style={styles.textBox}>
        <Text style={styles.text2}>{content.Datenschutz4}</Text>
      </View>
    </View>
  );
};
//quick reminder: Button gehört zum Navigation Component. Touchable Opacity wär noch cool.
//Standard Button lässt sich nicht verändern. Müsste Pressable nehmen.

const styles = StyleSheet.create({
  container: {
    paddingVertical: normalizeH(20),
    paddingHorizontal: "7%",
    height: "100%",
    width: "100%",
  },
  title: {
    marginTop: "18%",
    color: colors.accBlue,
    fontSize: normalizeH(15),
    lineHeight: normalizeH(22),
  },
  button: {
    margin: 50,
    elevation: 5,
  },
  text: {
    color: colors.mainLG,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
  },
  textBox: {
    marginTop: "10%",
    width: "100%",
    paddingTop: normalizeH(8),
    alignSelf: "flex-start",
  },

  text2: {
    color: colors.mainG,
    lineHeight: normalizeH(9),
    fontSize: normalizeH(7),
  },

  button1: {
    borderRadius: 8,
    height: 40,
    elevation: 3,
    backgroundColor: colors.accBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 300,
    height: 200,
  },
});

export default InfoTextScreen;
