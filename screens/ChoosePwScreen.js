import React, { useState } from "react";
import { View, StyleSheet, Image, Pressable, Text } from "react-native";
import colors from "../constants/colors";
import Input from "../components/Input";
import * as content from "../constants/texts";
import { normalizeH } from "../constants/fontResponsive";
import { normalize } from "../constants/fontResponsive";
import { storeMyStuff } from "../database/CreateDatabase";

/**
 *  ChoosePwScreen for Starters!
 *  takes the UILogo & Input Component.
 *
 *
 * ToDo: Navigation Bar
 * may find another solution for the marked Dates, it's just a dummy rn
 * also find a way to get the input outta it but that's prob. a diff issue
 *
 * @param {} props
 * @returns
 */
//Auch hier: Aiden, hilfe die Variablen zu übernehmen um sie zu Speichern!
//Josie: kein-passwort knopf muss weiterleiten auf nächsten slide, ist das möglich?
const ChoosePwScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState();
  const [confirmNumber, setConfirmNumber] = useState();

  const storeNewPassword = async () => {
    if (confirmNumber === enteredValue) {
      storeMyStuff("@passwordKey", enteredValue);
      alert("Danke Dir!\nDein Passwort wurde gespeichert");
    } else {
      alert("Die Widerholung des Passworts ist inkorrekt");
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
        <Pressable style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? colors.accBlue
              : colors.primBlue
              
          },
          styles.button1
        ]} onPress={() => storeNewPassword()}>
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
