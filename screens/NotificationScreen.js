import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import colors from "../constants/colors";
import TextWSwitch from "../components/TextWSwitch";
import { normalizeH } from "../constants/fontResponsive";



/**
 *  NotificationScreen for Starters! and for the Settings.. it can be recycled I guess? *cool*
 * takes the TextWSwitch Component and asks if Notifications are acceptable
 *
 * TODo Figure out how you can reuse the component and hand over the texts..
 * and how to safe the state and all..
 * 
 *
 *
 * @param {} props
 * @returns
 */
//Noch zu machen: Josie, kann man den switch größer machen?
//Und verbinden mit der datenbank
const NotificationScreen = (props) => {
  return (
    
    
      <View style={styles.head}>
          <Image style={styles.logo} source={require("../assets/Benachrichtigung.png")} />
        <Text style={styles.title}>Benachrichtigungen</Text>
        <View style={styles.container}>
        <TextWSwitch />
        </View>
       
      </View>
  
  );
};

const styles = StyleSheet.create({
  head:{
    paddingVertical: normalizeH(20),
    paddingHorizontal: "7%",
    height: "100%",
    width: "100%",
  },
  container: {
    paddingVertical: normalizeH(20),
   
    height: "100%",
    width: "100%",
  },
  title: {
    marginTop: "18%",
    color: colors.accBlue,
    fontSize: normalizeH(15),
    lineHeight: normalizeH(22),
  }, logo:{  
  alignSelf: "flex-start", 
  marginTop:  "20%",
  width: normalizeH(63),
  height: normalizeH(30),
},
});

export default NotificationScreen;
