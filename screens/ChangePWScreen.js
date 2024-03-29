import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Image,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import colors from "../constants/colors";
import Input from "../components/Input";
import * as content from "../constants/texts";
import { normalizeH } from "../constants/fontResponsive";
import { normalize } from "react-native-elements";
import {
  getMyStringStuff,
  removeMyStuff,
  storeMyStuff,
} from "../database/CreateDatabase";
/**
 *  Change Password Screen
 *  takes the UILogo & Input Component.
 *  to change Password with some describing Text.
 *
 * @author Aiden <aiden.roessler@haw-hamburg.de>
 * @author Mona <mona.vonhein@haw-hamburg.de> for final Styling and Database connection
 *
 * @param {} props
 * @returns ChangePWScreen
 */

//Startet Datenbank Aufruf

const ChangePWScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState();
  const [oldPW, setOldPW] = useState(0);
  const [confirmValue, setConfirmValue] = useState();
  const [confirmConfirmNumber, setConfirmConfirmNumber] = useState();
  const [selectedNumber, setSelectedNumber] = useState();
  const [confirmed, setConfirmed] = useState(false);
  const [gibtsPasswort, setGibtsaltesPasswort] = useState(
    "Kein Passwort festgelegt"
  );

  const getPassword = async () => {
    await getMyStringStuff("@passwordKey").then((returnedValue) => {
      if (returnedValue !== null) {
        console.log("Altes PW vorhanden");
        setGibtsaltesPasswort("alte Pin");
        setOldPW(JSON.parse(returnedValue));
      } else {
        setOldPW(0);
      }
    });
  };

  const [state, setState] = useState({});

  useEffect(() => {
    getPassword();
    return () => {
      setState({});
    };
  }, []);

  const navigate = () => {
    props.navigation.navigate("Settings");
    getPassword();
  };

  const storeNewPassword = async () => {
    if (enteredValue === oldPW || oldPW === 0) {
      if (confirmValue === confirmConfirmNumber) {
        removeMyStuff("@passwordKey");
        storeMyStuff("@passwordKey", confirmValue);
        resetInputHandler();
        Alert.alert(null, "Danke!\nDein neues Passwort wurde gespeichert", [
          { text: "okay", onPress: () => navigate() },
        ]);
      } else {
        resetInputHandler();
        Alert.alert(null, "Die Wiederholung der neuen Pin ist inkorrekt");
      }
    } else {
      resetInputHandler();
      Alert.alert(null, "Überprüfe die aktuelle Pin");
      console.log(oldPW);
    }
  };

  //validates Numbers only
  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const confirmValueHandler = (inputText) => {
    setConfirmValue(inputText.replace(/[^0-9]/g, ""));
  };

  const confirmConfirmNumberHandler = (inputText) => {
    setConfirmConfirmNumber(inputText.replace(/[^0-9]/g, ""));
  };

  //resets the Input in case nothing of worth was given
  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmValue("");
    setSelectedNumber("");
    setConfirmConfirmNumber("");
    setConfirmed(false);
  };

  useEffect(() => {
    getPassword();
    return () => setState({});
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/lock.png")} />

      <View style={styles.textBox}>
        <Text style={styles.title}>Passwort ändern</Text>
        <Text style={styles.text}>{content.Passwort2}</Text>
      </View>

      <Input
        title={gibtsPasswort}
        onChangeText={numberInputHandler}
        value={enteredValue}
      />
      <Input
        title={content.pin3}
        onChangeText={confirmValueHandler}
        value={confirmValue}
      />
      <Input
        title={content.pin4}
        onChangeText={confirmConfirmNumberHandler}
        value={confirmConfirmNumber}
      />

      <View style={styles.button}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? colors.accBlue : colors.primBlue,
            },
            styles.button1,
          ]}
          onPress={() => storeNewPassword()}
        >
          <Text style={styles.textButton}>{"speichern"}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: normalizeH(20),
    paddingHorizontal: "7%",
    alignItems: "center",
    height: "100%",
    flexDirection: "column",
  },
  title: {
    color: colors.accBlue,
    fontSize: normalizeH(10),
    lineHeight: 36,
    marginBottom: "5%",
  },
  textBox: {
    marginTop: "14%",
    width: "100%",
    paddingTop: normalizeH(8),
    alignSelf: "flex-start",
  },

  text: {
    color: colors.mainG,
    fontSize: normalizeH(7.5),
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
  logo: {
    alignSelf: "flex-start",

    marginTop: "15%",
    width: normalizeH(31),
    height: normalizeH(35),
  },

  button1: {
    marginRight: "20%",
    borderRadius: 8,

    height: normalize(40),
    width: normalize(100),
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    width: "100%",
    marginTop: "8%",
    height: "100%",
  },
});

export default ChangePWScreen;
