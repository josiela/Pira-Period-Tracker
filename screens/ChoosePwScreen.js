import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
  Pressable,
  Text,
  Vibration,
} from "react-native";
import UILogo from "../components/UILogo";
import colors from "../constants/colors";
import Input from "../components/Input";
import * as content from "../constants/texts";
import AddButton from "../components/AddButton";

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

const ChoosePwScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState();
  const [confirmNumber, setConfirmNumber] = useState();
  const [selectedNumber, setSelectedNumber] = useState();
  const [confirmed, setConfirmed] = useState(false);

  //validates Numbers only
  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const confirmNumberHandler = (inputText) => {
    setConfirmNumber(inputText.replace(/[^0-9]/g, ""));
  };

  //resets the Input in case nothing of worth was given
  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmNumber("");
    setSelectedNumber("");
    setConfirmed(false);
  };

  //confirms that a number was entered, else it throws an insult
  const confirmInputHandler = () => {
    console.log("clicked");
    var chosenPin0 = parseInt(enteredValue);
    var chosenPin1 = parseInt(confirmNumber);
    if (isNaN(chosenPin0 || chosenPin1)) {
      console.log("Fuck you");
      resetInputHandler();
    }
    if (chosenPin0 == chosenPin1) {
      const chosenPin = chosenPin0;
      console.log("IT IS SAAAME");
      setConfirmed(true);
      setSelectedNumber(chosenPin);
      setEnteredValue("");
      setConfirmNumber("");
      Keyboard.dismiss();
    } else {
      console.log("you failed to enter yer fkn pw");
      resetInputHandler();
      setConfirmed(false);
    }
  };

  //if pressed and confirmed selectedNumber holds the PIN
  if (confirmed) {
    console.log(selectedNumber + ".. here ye go");
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.imageBox}>
        <View>
          <UILogo src="gear" />
          <View style={styles.title}>
            <Text style={styles.text2}>{content.start7}</Text>
          </View>
          <Input
            title="Passwort"
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <Input
            title="Wiederholen"
            onChangeText={confirmNumberHandler}
            value={confirmNumber}
          />
        </View>

        <View style={styles.button}>
          <Pressable style={styles.button1} onPress={confirmInputHandler}>
            <Text style={styles.text}>{props.title}</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
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

export default ChoosePwScreen;
