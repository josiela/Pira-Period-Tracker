import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Keyboard,
  Image,
  Alert,
} from "react-native";
import InputNumber from "../components/InputNumber";
import * as content from "../constants/texts";
import colors from "../constants/colors";
import { normalize } from "../constants/fontResponsive";
import {
  storeMyStuff,
  getMyObjectStuff,
  getMyStringStuff,
} from "../database/CreateDatabase";
import { normalizeH } from "../constants/fontResponsive";
import { NativeEventEmitter } from "react-native-web";
/**
 * InputScreen for Mens and Cycle Length CHANGE
 *
 * Style I suppose..
 *
 * @param {*} props
 * @returns
 */

const MensCycleChangeScreen = (props) => {
  const [mensLength, setMensLength] = useState();
  const [cyclusLength, setCyclusLength] = useState();

  const [oldmensLength, setoldMensLength] = useState(44);
  const [oldcyclusLength, setoldCyclusLength] = useState(44);

  const mensHandler = (inputText) => {
    setMensLength(inputText.replace(/[^0-9]/g, ""));
  };

  const cycleHandler = (inputText) => {
    setCyclusLength(inputText.replace(/[^0-9]/g, ""));
  };

  const storeLengths = async () => {
    if (mensLength === null) {
      mensLength = oldmensLength;
    }
    if (cyclusLength === null) {
      cyclusLength = oldcyclusLength;
    }
    console.log("Wird gestored" + mensLength + cyclusLength);
    await storeMyStuff("@mensLength", mensLength);
    await storeMyStuff("@cyclusLength", cyclusLength);
    console.log(oldcyclusLength + " --- " + oldmensLength);
  };

  const getOldStuff = async () => {
    await getMyStringStuff("@mensLength").then((returnedValue) => {
      console.log("Old Length: " + JSON.parse(returnedValue));
      if (returnedValue !== null) {
        setoldMensLength(JSON.parse(returnedValue));
      } else {
        setoldMensLength(0);
      }
    });

    await getMyStringStuff("@cyclusLength").then((returnedValue) => {
      console.log("Old Length: " + JSON.parse(returnedValue));
      if (returnedValue !== null) {
        setoldCyclusLength(JSON.parse(returnedValue));
      } else {
        setoldCyclusLength(0);
      }
    });
  };

  const inputHandler = () => {
    console.log("gotcha");
    let mens = parseInt(mensLength);
    let cycle = parseInt(cyclusLength);
    console.log("mens " + mens + " cycle " + cycle);  
    if(mens >= 0 && cycle >=0 ){
      setMensLength("");
      setCyclusLength("");
      storeLengths();
      Keyboard.dismiss();
      Alert.alert(null, "changes have been saved", [{text: "okay",onPress: ()=>props.navigation.navigate("SettingsScreen")}]);
    }else{
      Alert.alert(null, "no entry fetched", [{text: "close"}]);
 
    }
       //
    
  
  };
  useEffect(() => {
    getOldStuff();
  }, []);
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/PeriodenundZykluslänge.png")}
      />

      <View style={styles.textBox}>
        <Text style={styles.title}>Menstruations- und Zykluslänge</Text>

        <Text style={styles.text}>{content.ZuM1}</Text>
        <View style={styles.zweigeteiltes}>
          <View style={styles.leftcontainer}>
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
              <Pressable style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? colors.accBlue
              : colors.primBlue
          },styles.button1
        ]} onPress={inputHandler}>
                <Text style={styles.textButton}>{"speichern"}</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.rightcontainer}>
            <Text style={styles.text2}>Alter Wert: {oldmensLength}</Text>

            <Text style={styles.text2}>Alter Wert: {oldcyclusLength}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    paddingVertical: normalizeH(20),
    paddingHorizontal: "7%",
    alignItems: "flex-start",
    height: "100%",
    flexDirection: "column",
  },
  zweigeteiltes: {
    flexDirection: "row",
  },
  leftcontainer: {
    width: "50%",
  },
  rightcontainer: {
    width: "50%",
  },
  title: {
    color: colors.accBlue,
    fontSize: normalizeH(10),
    lineHeight: 36,
    marginBottom: "5%",
  },
  textBox: {
    marginTop: "10%",
    width: "100%",
    paddingTop: normalizeH(8),
    alignSelf: "flex-start",
  },

  text: {
    color: colors.mainG,
    lineHeight: normalizeH(9),
    fontSize: normalizeH(7.5),
  },
  text2: {
    marginTop: "15%",
    marginLeft: "30%",
    color: colors.mainG,
    lineHeight: normalizeH(13),
    fontSize: normalizeH(7),
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
    borderRadius: 8,
    marginTop: "10%",
    height: normalize(40),
    width: normalize(100),
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "100%",
    height: "100%",
  },
});

export default MensCycleChangeScreen;
