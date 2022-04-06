import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as content from "../constants/texts";

import colors from "../constants/colors";
/**
 * InfoTextWithoutButton YAY
 * for the setting sheet along with ABOUT US a whole blabla Screen. :)
 *
 * ToDo Styles I guess evtl Scrollable?
 *
 * @param {*} props
 * @returns
 */

const InfoWOButtScreen = (props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{props.header}</Text>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.text}>{content.ZuM2}</Text>
      </View>
      <View style={styles.textBoxQuote}>
        <Text style={styles.textQuote}>{content.ZuM3}</Text>
      </View>
      <Text style={styles.title}>{content.why1}</Text>
      <View style={styles.textBox}>
        <Text style={styles.text}>{content.why2}</Text>
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
    paddingTop: 20,
  },
  text: {
    color: colors.mainG,
    fontSize: 16,
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
