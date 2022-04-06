import React, { useState } from "react";
import { View, StyleSheet, Alert, Pressable, Text, } from "react-native";
import * as content from "../constants/texts";

import colors from "../constants/colors";
/**
 * InfoTextScreen for Starters!
 * takes the Navigation Component and a WoT
 * 
 *  
 * ToDo: Navigation Bar
 * Decide on a diff Font? 
 * 
 * STYLES
 * 
 * @param {*} props 
 * @returns 
 */

const InfoTextScreen = (props) => {
  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.title}>{props.header}</Text>
        </View>
        
        <View style={styles.textBox}>
        <Text style={styles.text}>{content.Datenschutz4}</Text>
        </View>

      <View style={styles.buttonBox}>
        <Pressable
          style={styles.buttonDesign}
          onPress={() => Alert.alert("am pressed omg")}
        >
          <Text style={styles.textButton}>{props.title}</Text>
        </Pressable>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingTop: 50,
  },
  title:{
      color: colors.accBlue,
      fontSize: 32,
      lineHeight: 36,
    
  },
  
  textBox:{
      height: '60%',
      width: '80%',
      paddingTop: 20, 
  },

  text:{
      color: colors.mainG,
      fontSize: 20, 
  },

  //Button Styles
  buttonBox: {
    margin: 50,
    elevation: 5,
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
    elevation: 3,
    backgroundColor: colors.accBlue,
    alignItems: "center",
    justifyContent: "center",
  },

});

export default InfoTextScreen;
