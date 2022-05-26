import React, { useState } from "react";
import { Text, View, StyleSheet, Switch } from "react-native";
import colors from "../constants/colors";
import { normalizeH } from "../constants/fontResponsive";
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
    <View style={styles.mainContainer} >
      <Text style={styles.text}>{content.start8}</Text>
    <View style={styles.container}>
      <View style={styles.rowView}>
      <Text style={styles.text2}>Lieber nicht</Text>
      <Switch
        trackColor={{ false: colors.mainBlk, true: colors.primBlue }}
        thumbColor={isEnabled ? colors.accBlue : colors.mainG}
        ios_backgroundColor= {colors.mainBlk}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text style={styles.text3}>Ja, bitte</Text>
      </View>
    </View>
    </View>
  );

};

const styles = StyleSheet.create({
  container:{
    flexDirection:"column",
    width:"100%",
  justifyContent: 'flex-start',
  },  text2:{
    marginTop:"2%",
    marginRight:"10%",
    color: colors.mainG,
    lineHeight: normalizeH(9),
    fontSize: normalizeH(7),
  },
  text3:{
    marginTop:"2%",
    marginLeft:"10%",
    color: colors.mainG,
    lineHeight: normalizeH(9),
    fontSize: normalizeH(7),
  },
  text:{
    marginTop:"9%",
    color: colors.mainG,
    lineHeight: normalizeH(9),
    fontSize: normalizeH(7),
  },mainContainer:{
    width:"100%",
  },rowView:{
    marginTop:"10%",
    width: "100%",
    flexDirection:"row",
  }
});

export default TextWSwitch;
