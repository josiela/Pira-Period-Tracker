import React, { useState } from "react";
import { View, StyleSheet, Image, Alert, Pressable, Text } from "react-native";
import UILogo from "../components/UILogo";
import colors from "../constants/colors";
import Input from "../components/Input";
import * as content from "../constants/texts";

/**
 *  ChangePWScreen!
 *  takes the UILogo & Input Component.
 *
  *
 * @param {} props
 * @returns
 */


const ChangePWScreen = (props) => {
  return (
    <View style={styles.imageBox}>
      <View>
        <UILogo src="lock" />
        <View style={styles.title}>
          <Text style={styles.text2}>{content.pin1}</Text>
        </View>
        <Input title={content.pin2}/>
        <Input title={content.pin3}/>
        <Input title={content.pin4}/>
      </View>

      <View style={styles.button}>
        <Pressable
          style={styles.button1}
          onPress={() => Alert.alert(content.changeCheck)}
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
