import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  Text,
  TextInput,
} from "react-native";
import { normalize, normalizeH } from "../constants/fontResponsive";
import Entry from "../database/EntryClass";
import colors from "../constants/colors";
import {
  getMyStringStuff,
  removeMyStuff,
  storeMyStuff,
} from "../database/CreateDatabase";

const EntryScreen = (props) => {
  // get datestring with props.route.params.date
  let firstEntry = new Entry(1, 2, 3, 4, "Nichts Sonderliches");
  let [entryArray, setEntryArray] = useState([firstEntry]);
  const [blood, setBlood] = useState("");
  const [pain, setPain] = useState("");
  const [mood, setMood] = useState("");
  const [notes, setNotes] = useState("");

  const createNewEntry = async () => {
    //Wenn es schon nen Eintrag gibt, den erst löschen
    if (
      entryArray.find((entry) => entry.date === props.route.params.date) !==
      null
    ) {
      console.log("Bereits ein Eintrag vorhanden");
      entryArray = entryArray.filter(
        (entry) => entry.date !== props.route.params.date
      );
    } else {
      console.log("Kein Eintrag mit dem Datum vorhanden");
    }

    //Neues Objekt mit Daten anlegen und ins Array stecken
    let newEntry = new Entry(props.route.params.date, pain, mood, blood, notes);
    entryArray.push(newEntry);

    //Altes Array löschen, neues speichern
    removeMyStuff("@entryArrayKey");
    storeMyStuff("@entryArrayKey", entryArray);
  };

  //Zieht Array aus Datenbank
  const getArray = async () => {
    await getMyStringStuff("@entryArrayKey").then((returnedValue) => {
      if (returnedValue !== null) {
        setEntryArray(JSON.parse(returnedValue));
      } else {
        setEntryArray([firstEntry]);
      }
    });
  };

  //Sorgt für aktualisierung der Variablen nachdem die Datenbank fertig geladen hat
  useEffect(() => {
    let myEntry = entryArray.find(
      (entry) => entry.date === props.route.params.date
    );

    if (myEntry !== undefined) {
      console.log("Eintrag gefunden: " + myEntry.note);
      setNotes(myEntry.note);
      setPain(myEntry.pain);
      setMood(myEntry.mood);
      setBlood(myEntry.blood);
    } else {
      console.log("notes nicht vorhanden");
    }
  }, [entryArray]);

  //Startet Datenbank Aufruf
  useEffect(() => {
    getArray();
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <View style={styles.container3}>
          <Text style={styles.text}>{props.route.params.date}</Text>
        </View>

        <View style={styles.container2}>
          <View style={styles.bigTextContainer}>
            <Text style={styles.bigText}>{"Blutung : "}</Text>
            <Text style={styles.bigText}>{"Schmerz : "}</Text>
            <Text style={styles.bigText}>{"Stimmung :  "}</Text>
          </View>
          <View style={styles.IconRowContainer}>
            <View style={styles.inputRow}>
              <Pressable style={styles.iconBox} onPress={() => setBlood("1")}>
                <Image
                  style={styles.icon}
                  source={require("../assets/Blu1.png")}
                />
              </Pressable>
              <Pressable style={styles.iconBox} onPress={() => setBlood("2")}>
                <Image
                  style={styles.blod2}
                  source={require("../assets/Blut2.png")}
                />
              </Pressable>
              <Pressable style={styles.iconBox} onPress={() => setBlood("3")}>
                <Image
                  style={styles.blod3}
                  source={require("../assets/Blut3.png")}
                />
              </Pressable>
            </View>

            <View style={styles.inputRow}>
              <Pressable style={styles.iconBox} onPress={() => setPain("1")}>
                <Image
                  style={styles.clouds}
                  source={require("../assets/Schmerz1.png")}
                />
              </Pressable>
              <Pressable style={styles.iconBox} onPress={() => setPain("2")}>
                <Image
                  style={styles.clouds}
                  source={require("../assets/Schmerz2.png")}
                />
              </Pressable>
              <Pressable style={styles.iconBox} onPress={() => setPain("3")}>
                <Image
                  style={styles.clouds}
                  source={require("../assets/Schmerz3.png")}
                />
              </Pressable>
            </View>

            <View style={styles.inputRow}>
              <Pressable style={styles.iconBox} onPress={() => setMood("1")}>
                <Image
                  style={styles.faces}
                  source={require("../assets/Stimmung1.png")}
                />
              </Pressable>
              <Pressable style={styles.iconBox} onPress={() => setMood("2")}>
                <Image
                  style={styles.faces}
                  source={require("../assets/Stimmung2.png")}
                />
              </Pressable>
              <Pressable style={styles.iconBox} onPress={() => setMood("3")}>
                <Image
                  style={styles.faces}
                  onPress={() => (this.opacity = 0.2)}
                  source={require("../assets/stimmung3.png")}
                />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.bigDownContainer}>
          <Text style={styles.bigText2}>{"Notiz :"}</Text>
          <View style={styles.notesContainer}>
            <TextInput
              style={styles.textInputStyle}
              onChangeText={(text) => setNotes(text)}
              value={notes}
              multiline
              numberOfLines={4}
              placeholder="Tippe hier"
              placeholderTextColor={colors.accBlue}
            />
          </View>

          <View style={styles.button}>
            <Pressable style={styles.button1} onPress={() => createNewEntry()}>
              <Text style={styles.textButton}>{"speichern"}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "50%",
    marginTop: "10%",
  },
  container2: {
    flexDirection: "row",
    height: "80%",
  },
  container3: {
    flexDirection: "row",
    height: "10%",
    width: "100%",
  },
  bigDownContainer: {
    alignSelf: "center",
    height: "80%",
    width: "90%",
  },
  notesContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    alignSelf: "center",
    height: normalizeH(20),
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.accBlue,
  },
  IconRowContainer: {
    marginTop: normalizeH(15),
    height: normalize(250),
    width: "80%",
    marginLeft: "0%",
  },
  bigTextContainer: {
    flexDirection: "column",
    width: "35%",
    height: "90%",
    marginTop: "13%",
    marginLeft: "5%",
  },

  iconBox: {
    width: "30%",
    marginRight: "10%",
    height: normalize(50),
  },
  logo: {
    marginLeft: "4%",
    width: normalize(54.5),
    height: normalize(52),
  },
  inputRow: {
    flexDirection: "row",
    width: "60%",
    height: "20%",
    marginTop: "10%",
    marginRight: "7%",
  },

  textButton: {
    color: colors.mainLG,
    fontSize: normalize(16),
    lineHeight: normalize(21),
    letterSpacing: 0.25,
  },

  bigText: {
    marginTop: normalizeH(10),
    marginBottom: normalizeH(15),
    color: colors.accBlue,
    fontSize: normalize(20),
    lineHeight: normalize(30),
    letterSpacing: 0.25,
  },
  bigText2: {
    marginTop: "10%",
    color: colors.accBlue,
    fontSize: normalize(20),
    lineHeight: normalize(30),
    letterSpacing: 0.25,
  },
  text: {
    alignSelf: "center",
    marginLeft: "5%",
    color: colors.accBlue,
    fontSize: normalize(30),
    lineHeight: normalize(30),
    letterSpacing: 0.25,
  },
  icon: {
    height: normalize(45),
    width: normalize(25),
    alignSelf: "center",
    marginLeft: "10%",
  },
  blod2: {
    height: normalize(53),
    width: normalize(38),
    marginLeft: "10%",
  },
  blod3: {
    height: normalize(53),
    width: normalize(36),
  },
  faces: {
    height: normalize(50),
    width: normalize(48),
  },
  clouds: {
    marginTop: normalize(10),
    height: normalize(43),
    width: normalize(50),
  },

  button1: {
    borderRadius: 8,
    marginLeft: "64%",
    marginTop: "10%",
    height: normalize(40),
    width: normalize(100),
    elevation: 3,
    backgroundColor: colors.accBlue,
    alignItems: "center",

    justifyContent: "center",
  },
  textInputStyle: {
    alignSelf: "flex-start",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 7,
    fontSize: normalizeH(7),
  },
});

export default EntryScreen;
