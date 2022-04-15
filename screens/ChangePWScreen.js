import React, { useState } from "react";
import { View, StyleSheet, Alert, Pressable, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import UILogo from "../components/UILogo";
import colors from "../constants/colors";
import Input from "../components/Input";
import * as content from "../constants/texts";

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
 * @param {} props
 * @returns
 */


const ChangePWScreen = (props) => {


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
    <TouchableWithoutFeedback onPress={()=> {Keyboard.dismiss()}}>
    <View style={styles.container}>
      <UILogo src="lock" />
      
      <Text style={styles.title}>{content.pin1}</Text>
      
      <Text style={styles.text3}>{content.Passwort}</Text>
      
      <View style={styles.inputBox}>
      <Input title={content.pin2} onChangeText={numberInputHandler} value={enteredValue}/>
      <Input title={content.pin3} onChangeText={numberInputHandler} value={enteredValue}/>
      <Input title={content.pin4} onChangeText={numberInputHandler} value={enteredValue}/>
      </View>

      <View style={styles.button}>
        <Pressable
          style={styles.buttonDesign}
          onPress={confirmInputHandler}
        >
          <Text style={styles.text}>{props.title}</Text>
        </Pressable>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  imageBox: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 60,
    paddingVertical: 80,
    justifyContent: "space-between",
  },
  title: {
    color: colors.mainG,
    marginTop: 40,
    fontSize: 32,
    lineHeight: 36,
  },
  button: {
    elevation: 5,
    alignItems: "center",
  },
  text: {
    color: colors.mainLG,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
  },

  text2: {
    color: colors.mainG,
    fontSize: 20,
  },

  button1: {
    borderRadius: 8,
    height: 40,
    width: 80,
    elevation: 3,
    backgroundColor: colors.accBlue,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChangePWScreen;
