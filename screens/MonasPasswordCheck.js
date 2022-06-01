import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Alert,
  Pressable,
  Text,
  TextInput,
} from "react-native";
import { normalize } from "../constants/fontResponsive";
import { normalizeH } from "../constants/fontResponsive";
import UILogo from "../components/UILogo";
import colors from "../constants/colors";
import Input from "../components/Input";
import * as content from "../constants/texts";
import AddButton from "../components/AddButton";
import {storeMyStringStuff, getMyStringStuff, getMyObjectStuff, removeMyStuff,getAllKeys} from "../database/CreateDatabase";


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
const passwordScreenCheck = async (password, givenPassword) => {
  if (password == givenPassword) {
    //Hier weiterleitung einfügen, ich hab doch keine Ahnung von Navigation help
    {
      Alert.alert(
        "Richtig! Jetzt solltest du eigentlich weitergeleitet werden"
      );
    }
  } else {
    {
      Alert.alert("Passwort ungültig");
    }
  }
};

const MonasPasswordCheck = (props) => {
  //storeMyStuff("passwordKey", 1234); //Das hier muss raus sobald es wirklich ein altes Passwort gibt

  const [givenPassword, setGivenPassword] = useState();
  const [oldPassword, setOldPassword] = useState();
  
  const [databaseNumber, setDatabaseNumber] = useState("");

  const [text3, setText3] = useState("");

  //getMyStuff("passwordKey").then((returnedValue) => {
    //setOldPassword(JSON.parse(returnedValue));
  //});

  const getPWfromDBHandler = async() => {
    await getMyStringStuff('@password').then((value)=>{
      console.log("first"+value);
      setDatabaseNumber(value);
    });
    
   
  };
  const checkPassword = async() => {
    
    //Aiden, hier brauch ich das passwort hin, um es mit dem aus der db zu vergleichen
   //if(databaseNumber === eingegebeneNumber){
   //  weiterleiten}else {Fehlermeldung}
   //}
  };


  return (
    <View style={styles.imageBox}>
      
      <Image style={styles.logo} source={require("../assets/bubble.jpg")} />
      <View style= {styles.mainView}>
      <Text style={styles.text2}>{content.checkPasswordText}</Text>
      <View style={styles.inputView}>
        <Input title="Passwort" />
      </View>
     
      <View style={styles.textBox}>
             <Text style={styles.text2}>{databaseNumber}</Text>
          </View>

        <Pressable
          style={styles.button1}
          onPress={()=>checkPassword()}
        >
          <Text style={styles.text}>OK</Text>
        </Pressable>
      </View>
 
    </View>
  );
};
//quick reminder: Button gehört zum Navigation Component. Touchable Opacity wär noch cool.
//https://www.skptricks.com/2018/11/react-native-responsive-image-scale-to-fit-example.html
//Der button hat irgendwann seine default width vergessen wtf..

const styles = StyleSheet.create({
  imageBox: {
    paddingVertical: normalizeH(20),
    paddingHorizontal: "7%",
    height: "100%",
    width: "100%",
  },mainView:{
    alignItems:"center",
    marginTop:"20%",
    width:"100%",
    height:"70%",
  },
  title: {
    color: colors.mainG,
    marginTop: 40,
    fontSize: 32,
    lineHeight: 36,
  },logo: {
    alignSelf: "center",
    marginTop:  "40%",
    width: normalize(200),
    height: normalizeH(70),
  },

  text: {
    color: colors.mainLG,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
  },

  text2: {
    color: colors.mainG,
    fontSize: normalizeH(10),
  },

  button1: {
    borderRadius: 8,
    height: normalizeH(15),
    width: normalize(50),
    backgroundColor: colors.accBlue,
    alignItems: "center",
    justifyContent: "center",
    marginTop:"10%",
  },
});

export default MonasPasswordCheck;
