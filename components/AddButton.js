import React from "react";
import { View, Pressable, Alert } from "react-native";
import UILogo from "./UILogo";

/**
 * AddButton to navigate to the EntryScreen
 * @author Mona <mona.vonhein@haw-hamburg.de>
 * 
 * @param {*} props 
 */

const functiom=(props)=>{
  if(props.date[1]===undefined){
    
    Alert.alert(null, "Bitte wähle einen Tag für deinen Eintrag");
  }else{
    props.navigation.navigate("AddEntryScreen", {
      date: props.date,
     })

  }
};
const AddButton = (props) => {
  return (
    <View>
      <Pressable
        onPress={() =>
          functiom(props)
         
          
        }
      >
        <UILogo src={props.icon} styleType={props.sizeStyle} />
      </Pressable>
    </View>
  );
};

export default AddButton;
