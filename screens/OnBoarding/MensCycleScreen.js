import React, { useState } from "react";

import InputNumber from "../../components/InputNumber";
import { View, StyleSheet, Image, Pressable, Text } from "react-native";
import colors from "../../constants/colors";
import * as content from "../../constants/texts";
import { normalizeH } from "../../constants/fontResponsive";
import { normalize } from "../../constants/fontResponsive";
import { storeMyStuff } from "../../database/CreateDatabase";

/**
 *  Mens- Cycle Screen for OnBoarding
 *  takes the UILogo & Input Component.
 *  @author Aiden <aiden.roessler@haw-hamburg.de>
 * @author Mona <mona.vonhein@haw-hamburg.de> for Style and Database Connection
 *
 * @param {} props
 * @returns MensCycleScreen
 */

const MensCycleScreen = (props) => {
  const [mensLength, setMensLength] = useState();
  const [cyclusLength, setCyclusLength] = useState();
  const mensHandler = (inputText) => {
    setMensLength(inputText.replace(/[^0-9]/g, ""));
  };

  const cycleHandler = (inputText) => {
    setCyclusLength(inputText.replace(/[^0-9]/g, ""));
  };

  const storeNewLengths = async () => {
    if (mensLength !== null) {
      await storeMyStuff("@mensLength", mensLength);
    }
    if (cyclusLength !== null) {
      await storeMyStuff("@cyclusLength", cyclusLength);
    }
    if (cyclusLength === null && mensLength === null) {
      Alert.alert(null, "Bitte gib Daten ein, um sie zu speichern");
    } else {
      console.log("Angaben wurden gespeichert");
      props.navigation.navigate("6");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/PeriodenundZykluslänge.png")}
      />

      <View style={styles.textBox}>
        <Text style={styles.title}>Zeitliche Angaben</Text>

        <Text style={styles.text}>{content.start5}</Text>
      </View>

      <InputNumber
        title="Menstruationslänge "
        onChangeText={mensHandler}
        value={mensLength}
      />

      <InputNumber
        title="Zykluslänge"
        onChangeText={cycleHandler}
        value={cyclusLength}
      />

      <View style={styles.button}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? colors.accBlue : colors.primBlue,
            },
            styles.button1,
          ]}
          onPress={() => storeNewLengths()}
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
    marginTop: "8%",
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

    marginTop: "14%",
    width: normalizeH(31.5),
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
    marginTop: "10%",
    height: "100%",
  },
});

export default MensCycleScreen;
