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
 *
 * @param {} props
 * @returns
 */

const ChangePWScreen = (props) => {


  const [enteredValue, setEnteredValue] = useState();
  const [confirmValue, setConfirmValue] = useState();
  const [confirmConfirmNumber, setConfirmConfirmNumber] = useState();
  const [selectedNumber, setSelectedNumber] = useState();
  const [confirmed, setConfirmed] = useState(false);

  //validates Numbers only
  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const confirmValueHandler = (inputText)=>{
    setConfirmValue(inputText.replace(/[^0-9]/g, ""));
  };

  const confirmConfirmNumberHandler =(inputText)=>{
    setConfirmConfirmNumber(inputText.replace(/[^0-9]/g, ""));
  };


  //resets the Input in case nothing of worth was given
  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmValue('');
    setSelectedNumber('');
    setConfirmConfirmNumber('');
    setConfirmed(false);
  };

  /**
   * confirms that a number was entered. Checks if the oldPin and the oldPinCheck (dummy Variable - soon to be Databased) is the same and 
   * if chosenPin0 and chosenPin1 matches. If so it confirms the Input and it's a yay you I guess.
   */
  const confirmInputHandler = () => {
    console.log("clicked")
    const oldPin = parseInt(enteredValue);
    const oldPinCheck = 1234;
    const chosenPin0 = parseInt(confirmValue);
    const chosenPin1 = parseInt(confirmConfirmNumber);
    if (isNaN(chosenPin0 || chosenPin1)) {
      console.log("Fuck you");
      resetInputHandler;
    }
    if (oldPin == oldPinCheck && chosenPin0 == chosenPin1){
    //if (chosenPin0 == chosenPin1){
      const chosenPin = chosenPin0;
      console.log("IT IS SAAAME")
      setConfirmed(true);
      setSelectedNumber(chosenPin);
      setEnteredValue('');
      setConfirmValue('');
      setConfirmConfirmNumber('');
      Keyboard.dismiss();
    }
    else {
      console.log("you failed to enter yer fkn pw")
      resetInputHandler();
      setConfirmed(false);
    }
  };

  //if pressed and confirmed selectedNumber holds the renewed PIN
  if (confirmed) {
    console.log(selectedNumber + ".. here ye go");
  }

  return (
    <TouchableWithoutFeedback onPress={()=> {Keyboard.dismiss()}}>
    <View style={styles.container}>
      <UILogo src="lock" />
      
      <Text style={styles.title}>{content.pin1}</Text>
      
      <Text style={styles.text3}>{content.Passwort}</Text>
      
      <View>
      <Input title={content.pin2} onChangeText={numberInputHandler} value={enteredValue}/>
      <Input title={content.pin3} onChangeText={confirmValueHandler} value={confirmValue}/>
      <Input title={content.pin4} onChangeText={confirmConfirmNumberHandler} value={confirmConfirmNumber}/>
      </View>

      <View style={styles.buttonBox}>
        <Pressable
          style={styles.buttonDesign}
          onPress={confirmInputHandler}
        >
          <Text style={styles.textButton}>{props.title}</Text>
        </Pressable>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 40,
    paddingVertical: 80,
    justifyContent: "space-between",
  },

  titleBox: {
    color: colors.mainG,
    fontSize: 32,
    lineHeight: 36,
  },


  title: {
    color: colors.accBlue,
    fontSize: 20,
  },

  text3: {
    color: colors.mainG,
    fontSize: 16,
  },

  //Button Styles
  buttonBox: {
    elevation: 5,
    alignItems: "center",
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
    width: 80,
    elevation: 3,
    backgroundColor: colors.accBlue,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChangePWScreen;
