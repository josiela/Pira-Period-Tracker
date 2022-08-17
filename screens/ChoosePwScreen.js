import React, { useState } from "react";
import { View, StyleSheet, Keyboard, Pressable, Text } from "react-native";
import UILogo from "../components/UILogo";
import colors from "../constants/colors";
import Input from "../components/Input";
import * as content from "../constants/texts";
import { normalizeH } from "../constants/fontResponsive";
import { normalize } from "../constants/fontResponsive";

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
//Josie: kein-passwort knopf muss weiterleiten auf nächsten slide, ist das möglich?
// @Mona: jetzt müsste es gehen. Wenn du ne Methode brauchst, die im Pressable landet, dann gern in confirmInputHandler, da steckt die ganze Logik drin
const ChoosePwScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState();
  const [confirmNumber, setConfirmNumber] = useState();
  const [selectedNumber, setSelectedNumber] = useState();
  const [confirmed, setConfirmed] = useState(false);

  //validates Numbers only
  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const confirmNumberHandler = (inputText) => {
    setConfirmNumber(inputText.replace(/[^0-9]/g, ""));
  };

  //resets the Input in case nothing of worth was given
  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmNumber("");
    setSelectedNumber("");
    setConfirmed(false);
  };

  //confirms that a number was entered, else it throws an insult
  const confirmInputHandler = () => {
    console.log("clicked");
    var chosenPin0 = parseInt(enteredValue);
    var chosenPin1 = parseInt(confirmNumber);
    if (isNaN(chosenPin0 || chosenPin1)) {
      console.log("Fuck you");
      resetInputHandler();
    }
    if (chosenPin0 == chosenPin1) {
      const chosenPin = chosenPin0;
      console.log("IT IS SAAAME");
      setConfirmed(true);
      setSelectedNumber(chosenPin);
      setEnteredValue("");
      setConfirmNumber("");
      Keyboard.dismiss();
    } else {
      console.log("you failed to enter yer fkn pw");
      resetInputHandler();
      setConfirmed(false);
    }
  };

  //if pressed and confirmed selectedNumber holds the PIN
  if (confirmed) {
    console.log(selectedNumber + ".. here ye go");
  }

  return (
    <View style={styles.imageBox}>
      <View>
        <UILogo src="gear" />
        <View style={styles.title}>
          <Text style={styles.text2}>{content.start7}</Text>
        </View>
        <Input
          title="Passwort"
          onChangeText={numberInputHandler}
          value={enteredValue}
        />
        <Input
          title="Wiederholen"
          onChangeText={confirmNumberHandler}
          value={confirmNumber}
        />
      </View>

      <View style={styles.button}>
        <Pressable style={styles.button1} onPress={confirmInputHandler}>
          <Text style={styles.text}>{props.title}</Text>
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
    width: normalize(100),
    elevation: 3,
    backgroundColor: colors.accBlue,
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
