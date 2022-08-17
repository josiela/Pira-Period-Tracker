import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text, Keyboard } from "react-native";
import UILogo from "../components/UILogo";
import colors from "../constants/colors";
import Input from "../components/Input";
import * as content from "../constants/texts";
import {normalizeH } from "../constants/fontResponsive";
import { normalize } from "react-native-elements";
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
  }, textBox:{
    marginTop: "14%",
    width: "100%",
    paddingTop: normalizeH(8),
    alignSelf: 'flex-start',
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
   
    marginTop:  "20%",
    width: normalizeH(31),
    height: normalizeH(35),
  },
    
  button1: {
    marginRight:"20%",
    borderRadius: 8, 
    marginTop:"10%",
    height: normalize(40),
    width: normalize(100),
    elevation: 3,
    backgroundColor: colors.accBlue,
    alignItems: "center",
    justifyContent: "center",
  },button:{
    
    flexDirection: 'row',
    width:"100%",
     marginTop:"10%",
    height: "100%",
  }
});

export default ChangePWScreen;
