import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Pressable,
  Text,
  Keyboard,
} from "react-native";
import InputNumber from "../components/InputNumber";
import * as content from "../constants/texts";
import colors from "../constants/colors";
/**
 * InputScreen for Mens and Cycle Length CHANGE
 *
 * Style I suppose..
 *
 * @param {*} props
 * @returns
 */
const MensCycleChangeScreen = (props) => {
  const [enteredMens, setMens] = useState();
  const [enteredCycle, setCycle] = useState();

  const mensHandler = (inputText) => {
    setMens(inputText.replace(/[^0-9]/g, ""));
  };

  const cycleHandler = (inputText) => {
    setCycle(inputText.replace(/[^0-9]/g, ""));
  };

  const inputHandler = () => {
    console.log("gotcha");
    const mens = parseInt(enteredMens);
    const cycle = parseInt(enteredCycle);
    console.log("mens " + mens + " cycle " + cycle);
    setMens("");
    setCycle("");
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text2}>{props.header}</Text>
      <Text style={styles.text}>{content.ZuM1}</Text>

      <InputNumber
        title="Menstruationslänge"
        onChangeText={mensHandler}
        value={enteredMens}
      />

      <InputNumber
        title="Zykluslänge"
        onChangeText={cycleHandler}
        value={enteredCycle}
      />

      <View style={styles.buttonBox}>
        <Pressable style={styles.buttonDesign} onPress={inputHandler}>
          <Text style={styles.textButton}>{props.title}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 30,
    paddingVertical: 50,

    //justifyContent: 'space-around',
    //alignItems: 'center'
  },
  title: {
    color: colors.accBlue,
    fontSize: 32,
    lineHeight: 36,
  },

  text: {
    color: colors.mainG,
    fontSize: 20,
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
});

export default MensCycleChangeScreen;
