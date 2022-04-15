import React, { useState } from "react";
import { View, StyleSheet, Image, Alert, Pressable, Text, TextInput } from "react-native";
import InputNumber from '../components/InputNumber';
import * as content from "../constants/texts";
import colors from "../constants/colors";
import { storeMyStuff } from "../Database/CreateDatabase";
/**
 * InputScreen for Mens and Cycle Length with our lovely Logo FOR STARTERS!
 *
 * ToDo Styling prop smarter to return to it by the time we have a Navigation and a Logo at hand :)
 * 
 * 
 * @param {*} props 
 * @returns 
 */
 const storeLengths=async(mensLength, cyLength)=>{
  if(mensLength!=0){
      {Alert.alert("Vielen Dank! Deine Mens Länge wurde gespeichert ")}
      storeMyStuff('mensLength',mensLength);
  }else{
      {Alert.alert("Mens Länge wurde auf den durchschnittswert 6 gesetzt")}
  }
  if(cyLength!=null){
    {Alert.alert("Vielen Dank! Deine Mens Länge wurde gespeichert ")}
    storeMyStuff('cyLength',cyLength);
}else{
    {Alert.alert("Zyklus Länge wurde auf den durchschnittswert 28 Tage gesetzt")}
}
}


const MonasMensCycleScreen = (props) => {
  const [mensLength, setMensLength]= useState(6);
  const [cyLength, setCyLength]= useState(28);
  const [text, setText] = useState('');
  const [text3, setText3] = useState('');
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/bubble.jpg")} />
      <Text style={styles.textH}>{content.start5}</Text> 
      <InputNumber/>
      <TextInput
          style={{height: 60}}
          placeholder="Neue Pin"
          onChangeText={text => setMensLength(text)}
          defaultValue={text}
      />
       <TextInput
          style={{height: 60}}
          placeholder="Wiederholung"
          onChangeText={text => setCyLength(text)}
          defaultValue={text3}
      />
     

      <View style={styles.button}>
        <Pressable
          style={styles.button1}
          onPress={() => storeLengths(mensLength, cyLength)}
        >
          <Text style={styles.text}>{props.title}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 50,
    paddingVertical: 20,
    paddingTop:30,
    //justifyContent: 'space-around',
    //alignItems: 'center'

  },
  textH:{
    color: colors.mainG,
    fontSize: 20, 
  },

  logo: {
    width: 300,
    height: 200,
    
  },

  //Button Styles:
  text: {
    color: colors.mainLG,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
  },

  button: {
    margin: 50,
    elevation: 5,
  },
  
  button1: {
    borderRadius: 8,
    height: 40,
    elevation: 3,
    backgroundColor: colors.accBlue,
    alignItems: "center",
    justifyContent: "center",
  }
});

export default MonasMensCycleScreen;
