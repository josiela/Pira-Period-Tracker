import React, { forwardRef, useState } from "react";
import { View, StyleSheet, Alert, Pressable, Text } from "react-native";
import UILogo from "../components/UILogo";
import colors from "../constants/colors";
import Input from "../components/Input";
import * as content from "../constants/texts";
import {
  getMyStringStuff,
  removeMyStuff,
  storeMyStuff,
} from "../database/CreateDatabase";

/**
 *  ChoosePwScreen for Starters!
 *  takes the UILogo & Input Component.
 *
 *
 * ToDo: Navigation Bar
 * may find another solution for the marked Dates, it's just a dummy rn
 * also find a way to get the input outta it but that's prob. a diff issue
 *
 * @param {} props
 * @returns
 */

const PasswordCheck = (props) => {
  const [enteredPassword, setEnteredPassword] = useState("");

  const checkPasswordText = async () => {
    let storedPassword = await getMyStringStuff("@passwordKey");
    if (storedPassword == enteredPassword) {
      forward();
    } else {
      Alert.alert(
        "Dein eingegebenes Password ist falsch. Bitte versuche es erneut"
      );
    }
  };

  const forward = () => {
    props.unblockApp();
  };
  return (
    <View style={styles.imageBox}>
      <View>
        <UILogo src="gear" />
        <View style={styles.title}>
          <Text style={styles.text2}>{content.checkPasswordText}</Text>
        </View>
        <Input
          title="Passwort"
          onChangeText={(text) => setEnteredPassword('"' + text + '"')}
        />
      </View>

      <View style={styles.button}>
        <Pressable style={styles.button1} onPress={() => checkPasswordText()}>
          <Text style={styles.text}>{content.loginButton}</Text>
        </Pressable>
      </View>
    </View>
  );
};
//quick reminder: Button gehört zum Navigation Component. Touchable Opacity wär noch cool.
//https://www.skptricks.com/2018/11/react-native-responsive-image-scale-to-fit-example.html
//Der button hat irgendwann seine default width vergessen wtf..

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
    paddingStart: 15,
    paddingEnd: 15,
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
    elevation: 3,
    backgroundColor: colors.accBlue,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PasswordCheck;
