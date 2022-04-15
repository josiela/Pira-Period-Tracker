import React, { useState } from "react";
import { View, StyleSheet, Image, Alert, Pressable, Text , TextInput} from "react-native";
import UILogo from "../components/UILogo";
import colors from "../constants/colors";
import Input from "../components/Input";
import * as content from "../constants/texts";
import { getMyStuff } from "../Database/CreateDatabase";
import { storeMyStuff } from "../Database/CreateDatabase";

/**
 *  ChangePWScreen!
 *  takes the UILogo & Input Component.
 *
  *
 * @param {} props
 * @returns
 */

//Überprüft die Übereinstimmung der neuen Passwörter, die eingegebene aktuelle Pin und speichert im Bestfall die neue Pin
 const changePassword=async(oldPassword, givenOldPassword,newPassword1, newPassword2)=>{

    if(newPassword1==newPassword2){
     
       if(oldPassword==givenOldPassword){
        storeMyStuff('passwordKey',newPassword1);
        {Alert.alert("Passwort wurde aktualisiert")}

      }else{
        {Alert.alert("Bitte überprüfe die alte Pin")}
      }
    
    }else{
        {Alert.alert("Neues Passwort und Wiederholung stimmen nicht überein")}
    }
}



const ChangePWScreen = (props) => {
  storeMyStuff('passwordKey',1234);                 //Das hier muss raus sobald es wirklich ein altes Passwort gibt
  const [oldPassword, setOldPassword]= useState();
  const [givenOldPassword, setGivenOldPassword]= useState();
  const [newPassword1, setNewPassword1]= useState();
  const [newPassword2, setNewPassword2]= useState();
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');
  
  getMyStuff('passwordKey').then((returnedValue)=>{
    setOldPassword(JSON.parse(returnedValue));
  })
  return (
    <View style={styles.imageBox}>
      <View>
        <UILogo src="lock" />
        <View style={styles.title}>
          <Text style={styles.text2}>{content.pin1}</Text>
        </View>
        <Input title={content.pin2} />
        <Input title={content.pin3}/>
        <Input title={content.pin4}/>
        <TextInput
          style={{height: 60}}
          placeholder="Probiers mal"
          onChangeText={text => setGivenOldPassword(text)}
          defaultValue={text}
      />
       <TextInput
          style={{height: 60}}
          placeholder="Neue Pin"
          onChangeText={text => setNewPassword1(text)}
          defaultValue={text2}
      />
       <TextInput
          style={{height: 60}}
          placeholder="Wiederholung"
          onChangeText={text => setNewPassword2(text)}
          defaultValue={text3}
      />
      </View>

      <View style={styles.button}>
        <Pressable
          style={styles.button1}
          onPress={() => changePassword(oldPassword,givenOldPassword, newPassword1, newPassword2)}
        >
          <Text style={styles.text}>{props.title}</Text>
        </Pressable>
      </View>
    </View>
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
