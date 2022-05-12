import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import colors from "../constants/colors";

/**
 * Settings Component
 * sets up a map for the given array. It has a Touchable Opacity and styles the Array
 * in case of a subtitle it get's displayed
 * @param {settingOptions} param
 * @returns
 */
const Settings = ({ settingsOptions }) => {
  return (
    <ScrollView>
      {settingsOptions.map(({ title, subTitle, onPress }, index) => (
        <TouchableOpacity key={title}>
          <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            {subTitle && <Text style={styles.subtext}>{subTitle}</Text>}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    height: "60%",
    width: "80%",
    paddingTop: 20,
  },

  text: {
    color: colors.mainG,
    fontSize: 20,
  },
  subtext: {
    color: colors.mainBlk,

    fontSize: 16,
    paddingTop: 5,
  },
});

export default Settings;