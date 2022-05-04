import React from "react";
import { View, StyleSheet, Image, Alert, Pressable, Text } from "react-native";
import Settings from "../components/Settings";
import colors from "../constants/colors";

//evtl als subtitle die aktuelle Einstellung eingeben

/**
 * SettingsScreen taking the Settings component. Hands over an array of input, subTitle and onPress events
 * styles the Title "Einstellungen"
 * evtl Daten löschen als Pressable? damits rot ist und scary? :i
 * @param {*} props
 * @returns
 *
 * */

const SettingsScreen = (props) => {
  const settingsOptions = [
    { title: "Passwort ändern", subTitle: null, onPress: () => {} },
    {
      title: "Menstruationslänge & Zykluslänge",
      subTitle: "fml",
      onPress: () => {
        console.log("Pressed");
      },
    },
    { title: "Über uns", subTitle: null, onPress: () => {} },
    { title: "Info", subTitle: null, onPress: () => {} },
    {
      title: "Daten löschen",
      subTitle: null,
      onPress: () => props.navigation.navigate("InfoTextScreen"),
    },
  ];
  return (
    <View>
      <Text style={styles.title}>Einstellungen</Text>
      <Settings settingsOptions={settingsOptions} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.accBlue,
    fontSize: 32,
    lineHeight: 36,
  },
});

export default SettingsScreen;
