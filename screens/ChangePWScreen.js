import React, { useState } from "react";
import { View, StyleSheet, Alert, Image, Pressable, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
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
    <View style={styles.container}>
      
      <Image style={styles.logo} source={require("../assets/lock.png")} />

     
      <View style={styles.textBox}>
        
      <Text style={styles.title}>Passwort ändern</Text>
          <Text style={styles.text}>{content.Passwort2}</Text>
      </View>
   
      <Input title={content.pin2} onChangeText={numberInputHandler} value={enteredValue}/>
      <Input title={content.pin3} onChangeText={numberInputHandler} value={enteredValue}/>
      <Input title={content.pin4} onChangeText={numberInputHandler} value={enteredValue}/>
  
      <View style={styles.button}>
          <Pressable
            style={styles.button1}
            onPress={() => storeLengths()}
           
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
    fontSize: 32,
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
