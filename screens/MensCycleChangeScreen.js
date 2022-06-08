import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Pressable,
  Text,
  Keyboard,
  Image, 
} from "react-native";
import InputNumber from "../components/InputNumber";
import * as content from "../constants/texts";
import colors from "../constants/colors";
import { normalize } from "../constants/fontResponsive";
import { storeMyStuff, getMyObjectStuff } from "../database/CreateDatabase";
import { normalizeH } from "../constants/fontResponsive";/**
 * InputScreen for Mens and Cycle Length CHANGE
 *
 * Style I suppose..
 *
 * @param {*} props
 * @returns
 */


const MensCycleChangeScreen = (props) => {
  const [mensLength, setMensLength] = useState();
  const [cyclusLength, setCyclusLength] = useState();

  const mensHandler = (inputText) => {
    setMensLength(inputText.replace(/[^0-9]/g, ""));
  };

  const cycleHandler = (inputText) => {
    setCyclusLength(inputText.replace(/[^0-9]/g, ""));
  };

  const storeLengths = async() => {
    await storeMyStuff('@mensLength', mensLength);
    await storeMyStuff('@cyclusLengt', cyclusLength);
    
  };

  const inputHandler = () => {
    console.log("gotcha");
    const mens = parseInt(mensLength);
    const cycle = parseInt(cyclusLength);
    console.log("mens " + mens + " cycle " + cycle);
    setMensLength("");
    setCyclusLength("");
    Keyboard.dismiss();
   
  };

  return (
    <View style={styles.container}>
      
      <Image style={styles.logo} source={require("../assets/PeriodenundZykluslänge.png")} />

      <View style={styles.textBox}>
      
        
        <Text style={styles.title}>Menstruartions- und Zykluslänge</Text>
     
          <Text style={styles.text}>{content.ZuM1}</Text>
      </View>
      <InputNumber
        title="Menstruationslänge"
        onChangeText={mensHandler}
        value={mensLength}
      />

      <InputNumber
        title="Zykluslänge"
        onChangeText={cycleHandler}
        value={cyclusLength}
      />


      <View style={styles.button}>
          <Pressable
            style={styles.button1}
            onPress={inputHandler}
           
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
    marginBottom:"5%",
  }, textBox:{
    marginTop: "10%",
    width: "100%",
    paddingTop: normalizeH(8),
    alignSelf: 'flex-start',
  },

  text: {
    color: colors.mainG,
    lineHeight: normalizeH(9),
    fontSize: normalizeH(7),
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
    borderRadius: 8, 
    marginTop:"10%",
    height: normalize(40),
    width: normalize(100),
    elevation: 3,
    backgroundColor: colors.accBlue,
    alignItems: "center",
    justifyContent: "center",
  },button:{
    width:"100%",
    height: "100%",
  }
});

export default MensCycleChangeScreen;
