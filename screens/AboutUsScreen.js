import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as content from "../constants/texts";

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
      <View>
        <Text style={styles.title}>{props.header}</Text>
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>{content.au1}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 60,
    paddingHorizontal: 50,
    height: "100%",
  },
  title: {
    color: colors.accBlue,
    fontSize: 32,
    lineHeight: 36,
  },

  textBox: {
    paddingVertical: 20,
    paddingTop: 20,
  },

  text: {
    color: colors.mainG,
    fontSize: 16,
  },
});

export default AboutUsScreen;
