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

//Nextstep: Aiden, ich brauch die Variablen aus den Inputs auch hier so, dass ich sie in die DB stecken kann:)

const MensCycleChangeScreen = (props) => {
  const [mensLength, setMensLength] = useState(7);
  const [cyclusLength, setCyclusLength] = useState(28);

  const storeLengths = async() => {
    await storeMyStuff('@mensLength',mensLength);
    await storeMyStuff('@cyclusLengt', cyclusLength);
    
  };
  return (
    <View style={styles.container}>
      
      <Image style={styles.logo} source={require("../assets/PeriodenundZykluslänge.png")} />

      <View style={styles.textBox}>
          <Text style={styles.text}>{content.ZuM1}</Text>
      </View>
      <InputNumber />

      <View style={styles.button}>
          <Pressable
            style={styles.button1}
            onPress={() => storeLengths()}
           
          >
          <Text style={styles.textButton}>{"speichern"}</Text>
          </Pressable>
        </View>
        <Pressable
          style={styles.buttonDesign}
          onPress={() => Alert.alert(content.changeCheck)}
        >
          <Text style={styles.textButton}>{props.title}</Text>
        </Pressable>
     
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
