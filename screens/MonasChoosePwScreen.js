import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Alert,
  Pressable,
  Text,
  TextInput,
} from "react-native";
import UILogo from "../components/UILogo";
import colors from "../constants/colors";
import Input from "../components/Input";
import * as content from "../constants/texts";
import AddButton from "../components/AddButton";
import storeMyStuff from "../database/CreateDatabase";

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

//Das hier checkt erst, ob die Passwörter gleich sind, und speichert dann mit der storeMyStuff aus CreateDatabase das Passwort unter dem Key "passwordKey"
const checkPasswords = async (firstPassword1, secondPassword1) => {
  if (firstPassword1 == secondPassword1) {
    {
      Alert.alert("Vielen Dank! Dein Passwort wurde gespeichert ");
    }
    storeMyStuff("passwordKey", firstPassword1);
  } else {
    {
      Alert.alert("Passwörter sind nicht gleich");
    }
  }
};

const MonasChoosePwScreen = (props) => {
  const [firstPassword1, setFirstPassword1] = useState(0);
  const [secondPassword1, setSecondPassword1] = useState(0);
  return (
    <View style={styles.imageBox}>
      <View>
        <UILogo src="gear" />
        <View style={styles.title}>
          <Text style={styles.text2}>{content.start7}</Text>
        </View>
        <Input title="Passwort" value={firstPassword1} />
        <Input title="Wieeeederholen" value={secondPassword1} />
      </View>

      <View style={styles.button}>
        <Pressable
          style={styles.button1}
          onPress={() => checkPasswords(firstPassword1, secondPassword1)}
        >
          <Text style={styles.text}>{props.title}</Text>
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

export default MonasChoosePwScreen;
