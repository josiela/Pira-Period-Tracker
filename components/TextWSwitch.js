import React, { useState } from "react";
import { Text, View, StyleSheet, Switch } from "react-native";
import colors from "../constants/colors";
import * as content from "../constants/texts";

/**
 * Text with Switch Component
 *
 * ToDo: herausfinden, wie man den den content hier im Text übergibt.
 * über Props.. sonst müssen halt die anderen Screens, die dieses Component nutzen, 
 * jedes Mal n eigenes Text Benutzen.
 * 
 * 
 * @param {*} props
 * @returns Component
 */


const TextWSwitch = (props) => {

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return(
    <View >
      <Text style={styles.text}>{content.start8}</Text>
    <View style={styles.container}>
      
      <Switch
        trackColor={{ false: colors.mainBlk, true: colors.primBlue }}
        thumbColor={isEnabled ? colors.accBlue : colors.mainG}
        ios_backgroundColor= {colors.mainBlk}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
    </View>
  );

};

const styles = StyleSheet.create({
  container:{
  justifyContent: 'center'
  },
  text:{
    color: colors.mainG,
    fontSize: 20, 
  }
});

export default TextWSwitch;
