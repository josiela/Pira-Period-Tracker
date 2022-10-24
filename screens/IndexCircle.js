import { useEffect, React, useState } from "react";
import colors from "../constants/colors";
import { View, Text, StyleSheet, Image } from "react-native";
import { normalizeH } from "../constants/fontResponsive";
import { getMyStringStuff } from "../database/CreateDatabase";
import { useIsFocused } from "@react-navigation/native";
import { useSafeAreaFrame } from "react-native-safe-area-context";

/**
 *
 * IndexCircle HomeScreen
 * @author Josie <joseffa.steuernagel@haw-hamburg.de>
 *
 * @param {*} props
 * @returns IndexCircle
 */

const IndexCircle = (props) => {
  // to check if screen is active
  const isFocused = useIsFocused();

  let degree = "80deg";

  // get date aus Datenbank später:

  //------------//
  //Nächste Mens Anfang und Ende
  const [nextMensBeginning, setNextMensBeginning] = useState("");
  const [nextMensEnd, setNextMensEnd] = useState("");
  //Menstruationslänge
  const [mensLength, setMensLength] = useState(6);
  //gesamte Zycluslänge
  const [totalLength, setTotalLength] = useState(28);
  //-----------//

  let setCycleDaysLeft = totalLength;
  let days = "Tage";
  let status = "bis zur nächsten Periode";

  let imgSrc;

  //Hier ist ein Abschnitt mit meinem Datenbank zeugs----------
  const getData = async () => {
    await getMyStringStuff("@mensLength").then((returnedValue) => {
      if (returnedValue !== null) {
        setMensLength(JSON.parse(returnedValue));
      } else {
        console.log("Error: No Menslength set");
        setMensLength(6);
      }
    });

    await getMyStringStuff("@cyclusLength").then((returnedValue) => {
      if (returnedValue !== null) {
        setTotalLength(JSON.parse(returnedValue));
      } else {
        console.log("Error: No Cycle Length set");
        setTotalLength(28);
      }
    });

    await getMyStringStuff("@firstDayKey").then((returnedValue) => {
      if (returnedValue !== null) {
        setNextMensBeginning(new Date(returnedValue).getTime());
      } else {
        console.log("NextMensBeginning ist leer");
      }
    });
    await getMyStringStuff("@lastDayKey").then((returnedValue) => {
      if (returnedValue !== null) {
        setNextMensEnd(new Date(returnedValue).getTime());
      } else {
        console.log("NextMensEnd ist leer");
      }
    });
  };
  // Datenbank Abschnitt zu Ende-------------------------------
  function cyclusPositionBerechnung(cycleLength, menstruationLength) {
    // Follikel und Luteal Länge (gF)
    let gF = cycleLength - menstruationLength;
    //--- übrige Tage berechnen ---//
    const oneDay = 1000 * 60 * 60 * 24;

    let daysLeft = Math.round((nextMensBeginning - props.date) / oneDay);
    console.log("Next Cycle: ", nextMensBeginning);
    console.log("Date: " + props.date);
    console.log("Next: " + nextMensBeginning);
    //-----------------------------//

    if (daysLeft > gF) {
      status = "";
      // noch in Menstruation
      imgSrc = require("../assets/Circle/Indicators/spotting.png");
      // Berechnung der Position des roten Balkens
      if (daysLeft == 1) {
        setCycleDaysLeft = 1;
        days = "Tag";
        // erster Tag, Ausgangsposition kann automatisch eingestellt werden
        return "80deg";
      } else {
        days = "Tage";
        // Position auf Kreis muss berechnet werden
        let mensLeft = daysLeft - gF;
        let einTag;
        setCycleDaysLeft = mensLeft;
        if (mensLeft > mensLength) {
          einTag = kreisabschnittBerechnung(90, mensLeft);
        } else {
          einTag = kreisabschnittBerechnung(90, mensLength);
        }
        let bogenPosition = einTag * mensLeft;
        let resultToString = bogenPosition.toString();
        degree = resultToString + "deg";
        return degree;
      }
    } else {
      if (daysLeft == 1) {
        days = "Tag";
      } else {
        days = "Tage";
      }
      status = "bis zur nächsten Periode";
      setCycleDaysLeft = daysLeft;
      // in Follikelphase
      imgSrc = require("../assets/Circle/Indicators/empty.png");
      // Berechnung des Abstands zum roten Balken
      let einTag = kreisabschnittBerechnung(270, gF);
      let bogenPosition = einTag * daysLeft + 80;
      let resultToString = bogenPosition.toString();
      degree = resultToString + "deg";
      return degree;
    }
  }

  function kreisabschnittBerechnung(grad, tage) {
    let abschnitt = grad / tage;
    return abschnitt;
  }

  useEffect(() => {
    getData();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Zyklus-Übersicht</Text>
      </View>
      <View style={styles.bigView}>
        <View style={styles.circleContainer}>
          <Image
            source={require("../assets/Circle/circle.png")}
            style={{
              transform: [
                {
                  rotate: cyclusPositionBerechnung(totalLength, mensLength),
                },
              ],
              width: "100%",
            }}
          />
          <Image source={imgSrc} style={styles.indicator} />
          <View style={styles.daysLeftText}>
            <Text style={styles.text}>
              {setCycleDaysLeft} {days}
            </Text>
            <Text>{status}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    // textAlign: "center",
    alignSelf: "center",
    lineHeight: normalizeH(9),
    color: colors.primBlue,
    fontSize: normalizeH(9),
  },
  title: {
    marginTop: "18%",
    color: colors.accBlue,
    fontSize: normalizeH(15),
    lineHeight: normalizeH(22),
  },
  container: {
    paddingVertical: normalizeH(20),
    paddingHorizontal: "7%",
    height: "100%",
    width: "100%",
  },
  circleContainer: {
    paddingTop: "30%",
    position: "relative",
    display: "flex",
    flexWrap: "nowrap",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  indicator: {
    position: "absolute",
    alignSelf: "center",
    top: "30%",
  },
  daysLeftText: {
    position: "absolute",
    alignItems: "center",
  },
  bigView: {
    height: "90%",
  },
});

export default IndexCircle;
