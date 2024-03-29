import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../constants/colors";
import { normalizeH } from "../constants/fontResponsive";

/**
 * Settings Component
 * sets up a map for the given array. It has a Touchable Opacity and styles the Array
 * in case of a subtitle it get's displayed
 * @author Aiden <aiden.roessler@haw-hamburg.de>
 * @author Mona <mona.vonhein@haw-hamburg.de> for final Style
 *
 * @param {settingOptions} param
 * @returns
 */
const Settings = ({ settingsOptions }) => {
  return (
    <View>
      {settingsOptions.map(({ title, subTitle, onPress }, index) => (
        <TouchableOpacity key={title} onPress={onPress}>
          <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            {subTitle && <Text style={styles.subtext}>{subTitle}</Text>}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: "9%",
    paddingTop: "7%",
    paddingBottom: normalizeH(16),
  },

  text: {
    color: colors.mainG,
    fontSize: normalizeH(7.5),
  },
  subtext: {
    color: colors.mainBlk,
    fontSize: 16,
    paddingTop: 5,
  },
});

export default Settings;
