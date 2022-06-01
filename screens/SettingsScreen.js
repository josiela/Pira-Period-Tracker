import React from "react";
import { View, StyleSheet, Image, Alert, Pressable, Text } from "react-native";
import Settings from "../components/Settings";
import colors from "../constants/colors";
import StackNavigation from "../components/Navigation/StackNavigation";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//evtl als subtitle die aktuelle Einstellung eingeben

/**
 * SettingsScreen taking the Settings component. Hands over an array of input, subTitle and onPress events
 * styles the Title "Einstellungen"
 * evtl Daten löschen als Pressable? damits rot ist und scary? :i
 * @param {*} props
 * @returns
 *
 * */

const SettingsScreen = (props) => {
  const settingsOptions = [
    { title: "Passwort ändern", subTitle: null, onPress:()=> props.navigation.navigate('ChangePW')},
    { title: "Menstruationslänge & Zykluslänge", subTitle: "fml", onPress: () => props.navigation.navigate("MensundZyklus") },
    { title: "Über uns", subTitle: null, onPress: () => props.navigation.navigate("AboutUs") },
    { title: "Info", subTitle: null, onPress: () => props.navigation.navigate("Info") },
    { title: "Daten löschen", subTitle: null, onPress: ()=> {console.log("Total Destruction!")}}
  ];

  
  return (
    <View>
      <Text style={styles.title}>Einstellungen</Text>
      
      <Settings settingsOptions={settingsOptions}/>
      
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.accBlue,
    fontSize: 32,
    lineHeight: 36,
  },
});

export default SettingsScreen;



