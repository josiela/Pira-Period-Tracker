import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
  Pressable,
  Text,
} from "react-native";
import Input from "../components/Input";
import colors from "../constants/colors";
/**
 * The Screen we forgot about.
 * Login PW Screen
 *
 * takes the Image Source of our Logo and asks the password
 *
 * ToDo: Navigation and create a Logo. The Image is a dummy rn.
 * Also takes in the Password, so it's safe to unlock :)
 * needs to add logic: Like failed PW
 *
 * @param {*} props
 * @returns
 */
const LoginPWScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [selectedNumber, setSelectedNumber] = useState();
  const [confirmed, setConfirmed] = useState(false);

  //validates Numbers only
  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  //resets the Input in case nothing of worth was given
  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  //confirms that a number was entered, else it throws an insult
  const confirmInputHandler = () => {
    const chosenPin = parseInt(enteredValue);
    if (isNaN(chosenPin)) {
      console.log("Fuck you");
      resetInputHandler;

      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenPin);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  //if pressed and confirmed selectedNumber holds the PIN
  if (confirmed) {
    console.log(selectedNumber + ".. here ye go");
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/bubble.jpg")} />

        <View style={styles.inputBox}>
          <Input
            title="Passwort"
            blurOnSubmit
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
        </View>
        <View style={styles.buttonBox}>
          <Pressable style={styles.buttonDesign} onPress={confirmInputHandler}>
            <Text style={styles.textButton}>{props.title}</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "50%",
  },
  logo: {
    width: 300,
    height: 200,
  },
  inputBox: {},
  //Button Styles
  buttonBox: {
    margin: 50,
    elevation: 5,
  },

  textButton: {
    color: colors.mainLG,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
  },

  buttonDesign: {
    borderRadius: 8,
    height: 40,
    elevation: 3,
    backgroundColor: colors.accBlue,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginPWScreen;
