import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import colors from "../constants/colors";
import TextWSwitch from "../components/TextWSwitch";
import { normalizeH } from "../constants/fontResponsive";

/**
 *  NotificationScreen for Starters! and for the Settings.. it can be recycled I guess? *cool*
 * takes the TextWSwitch Component and asks if Notifications are acceptable
 *
 * TODo Figure out how you can reuse the component and hand over the texts..
 * and how to safe the state and all..
 *
 *
 *
 * @param {} props
 * @returns
 */
//Noch zu machen: Josie, kann man den switch größer machen?
//Und verbinden mit der datenbank
const NotificationScreen = (props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/Benachrichtigung.png")}
      />

      <View style={styles.textBox}>
        <Text style={styles.title}>Benachrichtigungen</Text>
      </View>
      <TextWSwitch />
    </View>
  );
};

const styles = StyleSheet.create({
  head: {
    paddingVertical: normalizeH(20),
    paddingHorizontal: "7%",
    height: "100%",
    width: "100%",
  },
  container: {
    paddingVertical: normalizeH(20),
    paddingHorizontal: "7%",
    alignItems: "center",
    height: "100%",
    flexDirection: "column",
  },
  title: {
    color: colors.accBlue,
    fontSize: normalizeH(10),
    lineHeight: 36,
    marginBottom: "10%",
  },
  textBox: {
    marginTop: "8%",
    width: "100%",
    paddingTop: normalizeH(8),
    alignSelf: "flex-start",
  },

  text: {
    color: colors.mainG,
    fontSize: 20,
  },

  logo: {
    alignSelf: "flex-start",

    marginTop: "30%",
    width: normalizeH(51),
    height: normalizeH(25),
  },
});

export default NotificationScreen;
