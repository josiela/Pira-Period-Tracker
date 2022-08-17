import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as content from "../constants/texts";
import { normalizeH } from "../constants/fontResponsive";

import colors from "../constants/colors";
/**
 * ABOUT US
 * a little Screen with blabla About Us.
 * @param {*} props
 * @returns
 */

const AboutUsScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{content.au2}</Text>

      <View style={styles.textBox}>
        <Text style={styles.text}>{content.au1}</Text>
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
    marginTop: "18%",
    color: colors.accBlue,
    fontSize: normalizeH(15),
    lineHeight: normalizeH(22),
  },

  textBox: {
    marginTop: "26%",
    width: "100%",
    paddingTop: normalizeH(8),
    alignSelf: "flex-start",
  },

  text: {
    lineHeight: normalizeH(9),
    color: colors.mainG,
    fontSize: normalizeH(7),
  },
});

export default AboutUsScreen;
