import React, { useState } from "react";
import { View, StyleSheet, Image, Alert, Pressable, Text } from "react-native";
import InputNumber from "../components/InputNumber";
import * as content from "../constants/texts";
import colors from "../constants/colors";
/**
 * InputScreen for Mens and Cycle Length with our lovely Logo FOR STARTERS!
 *
 * ToDo Styling prop smarter to return to it by the time we have a Navigation and a Logo at hand :)
 *
 *
 * @param {*} props
 * @returns
 */
const MensCycleScreen = (props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/bubble.jpg")} />
      <Text style={styles.text}>{content.start5}</Text>
      <InputNumber />

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
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 50,
    paddingVertical: 20,
    paddingTop: 30,
    //justifyContent: 'space-around',
    //alignItems: 'center'
  },
  text: {
    color: colors.mainG,
    fontSize: 20,
  },

  logo: {
    width: 300,
    height: 200,
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

export default MensCycleScreen;
