import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { normalizeH } from "../constants/fontResponsive";
import * as content from "../constants/texts";
import colors from "../constants/colors";

/**
 * @author Josie <joseffa.steuernagel@haw-hamburg.de>
 * @author Mona <mona.vonHein@haw-hamburg.de> for final Style
 * @param {*} props
 * @returns EndOfOnBoarding
 *
 * This is an example page for the last page of the OnBoarding pages.
 * Here the transition to the start page is handled (at the moment by a button click).
 * This communicates to <OnBoarding>, and from there on to App.js via props
 */

const EndOfOnBoarding = (props) => {
  // onPress triggers the updateState function in OnBoarding
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Geschafft</Text>

      <View style={styles.textBox}>
        <Text style={styles.text}>{content.endOnb}</Text>
      </View>
      <View style={styles.button}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? colors.accBlue : colors.primBlue,
            },
            styles.button1,
          ]}
          onPress={props.updateState}
        >
          <Text style={styles.text2}>Einrichtung beenden</Text>
        </Pressable>
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
  button: {
    marginTop: "50%",
    elevation: 5,
  },
  textBox: {
    marginTop: "14%",
    width: "100%",
    paddingTop: normalizeH(8),
    alignSelf: "flex-start",
  },

  text: {
    lineHeight: normalizeH(9),
    color: colors.mainG,
    fontSize: normalizeH(7.5),
  },
  text2: {
    lineHeight: normalizeH(9),
    color: colors.mainLG,
    fontSize: normalizeH(7.5),
  },

  button1: {
    borderRadius: 8,
    height: 40,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 300,
    height: 200,
  },
  title: {
    marginTop: "18%",
    color: colors.accBlue,
    fontSize: normalizeH(15),
    lineHeight: normalizeH(22),
  },
});

export default EndOfOnBoarding;
