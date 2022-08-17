import React from "react";
import { View, StyleSheet, Image, Pressable, Text } from "react-native";
import colors from "../constants/colors";
import * as content from "../constants/texts";
import { normalizeH } from "../constants/fontResponsive";
import { normalize } from "react-native-elements";
import { deleteAll } from "../database/CreateDatabase";
/**
 *  ChangePWScreen!
 *  takes the UILogo & Input Component.
 *  to change Password with some describing Text.
 *  Keyboard dismisses as soon as you tab the screen so you can switch to the next field
 *
 * ToDo Styling
 *
 * ToDo Logik, checks old and new Input and fetches it from the database.
 *
 *
 * @param {} props
 * @returns
 */

const DeleteScreen = (props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/BigX.png")} />

      <View style={styles.textBox}>
        <Text style={styles.title}>App zurücksetzen</Text>
        <Text style={styles.text}>{content.getBack}</Text>
      </View>

      <View style={styles.button}>
        <Pressable style={styles.button1} onPress={() => deleteAll()}>
          <Text style={styles.textButton}>{"zurücksetzen"}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  textBox: {
    marginTop: "14%",
    width: "100%",
    paddingTop: normalizeH(8),
    alignSelf: "flex-start",
  },

  text: {
    color: colors.mainG,
    fontSize: 20,
  },

  //Button Styles:
  textButton: {
    color: colors.mainLG,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
  },

  buttonBox: {
    margin: 50,
    elevation: 5,
  },

  buttonDesign: {
    borderRadius: 8,
    height: 40,
    elevation: 3,
    backgroundColor: colors.accBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    alignSelf: "flex-start",

    marginTop: "20%",
    width: normalizeH(31),
    height: normalizeH(35),
  },

  button1: {
    marginRight: "20%",
    borderRadius: 8,
    marginTop: "10%",
    height: normalize(40),
    width: normalize(120),
    elevation: 3,
    backgroundColor: colors.accOrange,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    width: "100%",
    marginTop: "10%",
    height: "100%",
  },
});

export default DeleteScreen;
