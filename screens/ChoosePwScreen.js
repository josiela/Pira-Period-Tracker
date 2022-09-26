import React, { useState } from "react";
import { View, StyleSheet, Image, Pressable, Text, Alert } from "react-native";
import colors from "../constants/colors";
import Input from "../components/Input";
import * as content from "../constants/texts";
import { normalizeH } from "../constants/fontResponsive";
import { normalize } from "../constants/fontResponsive";
import { storeMyStuff } from "../database/CreateDatabase";

/**
 *  ChoosePwScreen for OnBoarding
 *  takes the UILogo & Input Component.
 * @author Aiden <aiden.roessler@haw-hamburg.de>
 * @author Mona <mona.vonhein@haw-hamburg.de> for Style and Database Connectivity
 *
 * @param {} props
 * @returns ChoosePwScreen
 */

const ChoosePwScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState();
  const [confirmNumber, setConfirmNumber] = useState();
  let k = false;

  const storeNewPassword = async () => {
    if (confirmNumber === enteredValue) {
      storeMyStuff("@passwordKey", enteredValue);
      props.navigation.navigate("9");
    }
    if (isNaN(confirmNumber) || isNaN(enteredValue)) {
      Alert.alert(null, "Bitte gib in beiden Feldern dein passwort ein");
      k = true;
    }
    if (confirmNumber !== enteredValue && k === false) {
      Alert.alert(null, "Die Wiederholung des Passworts ist inkorrekt");
    }
  };

  //validates Numbers only
  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const confirmNumberHandler = (inputText) => {
    setConfirmNumber(inputText.replace(/[^0-9]/g, ""));
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/lock.png")} />

      <View style={styles.textBox}>
        <Text style={styles.title}>Passwort-Sicherung</Text>

        <Text style={styles.text}>{content.Passwort}</Text>
      </View>

      <Input
        title="Passwort"
        onChangeText={numberInputHandler}
        value={enteredValue}
      />
      <Input
        title="Wiederholung"
        onChangeText={confirmNumberHandler}
        value={confirmNumber}
      />

      <View style={styles.button}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? colors.accBlue : colors.primBlue,
            },
            styles.button1,
          ]}
          onPress={() => storeNewPassword()}
        >
          <Text style={styles.textButton}>{"speichern"}</Text>
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
    marginBottom: "5%",
  },
  textBox: {
    marginTop: "10%",
    width: "100%",
    paddingTop: normalizeH(8),
    alignSelf: "flex-start",
  },

  text: {
    color: colors.mainG,
    fontSize: normalizeH(7.5),
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

    marginTop: "15%",
    width: normalizeH(31),
    height: normalizeH(35),
  },

  button1: {
    marginRight: "20%",
    borderRadius: 8,
    height: normalize(40),
    width: normalize(100),
    elevation: 3,
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

export default ChoosePwScreen;
