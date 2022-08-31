import {useEffect, React} from "react";
import colors from "../constants/colors";
import { View, Text, StyleSheet, Image } from "react-native";
import { normalizeH } from "../constants/fontResponsive";
import {
  getMyStringStuff,
  removeMyStuff,
  storeMyStringStuff,
  storeMyStuff,
} from "../database/CreateDatabase";

const IndexCircle = (props) => {
  var degree = "80deg";

  console.log("Heute ist: " + props.date);

  // get date aus Datenbank später:

  //------------//
  //Menstruationslänge
  var mensLength = 6; // aus Datenbank, TYPE=NUMBER
  //gesamte Zycluslänge
  var totalLength = 28; // aus Datenbank TYPE=NUMBER
  // Timestamp des nächsten Zyklusbeginns
  var nextCycle = new Date(2022, 7, 30).getTime(); // aus Datenbank
  //-----------//

  var setCycleDaysLeft = totalLength;
  var days = "Tage";
  var status = "bis zur nächsten Periode";

  var imgSrc;

  //Hier ist ein Abschnitt mit meinem Datenbank zeugs----------
  const getOldStuff = async () => {
    await getMyStringStuff("@mensLength").then((returnedValue) => {
      console.log("Old Length: " + JSON.parse(returnedValue));
      if (returnedValue !== null) {
        mensLength=JSON.parse(returnedValue);
      } else {
        mensLength=6;
      }
    });

    await getMyStringStuff("@cyclusLength").then((returnedValue) => {
      console.log("Old Length: " + JSON.parse(returnedValue));
      if (returnedValue !== null) {
        totalLength=JSON.parse(returnedValue);
      } else {
        totalLength=28;
      }
    });

  };
  // Datenbank Abschnitt zu Ende-------------------------------

  function cyclusPositionBerechnung(cycleLength, menstruationLength) {
    // Follikel und Luteal Länge (gF)
    var gF = cycleLength - menstruationLength;
    //--- übrige Tage berechnen ---//
    const oneDay = 1000 * 60 * 60 * 24;

    var daysLeft = Math.round((nextCycle - props.date) / oneDay);
    console.log("Total Days left: " + daysLeft);
    //-----------------------------//

    if (daysLeft > gF) {
      console.log("noch in mens");
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
        var mensLeft = daysLeft - gF;
        setCycleDaysLeft = mensLeft;
        console.log("MensDays left: " + mensLeft);
        if (mensLeft > mensLength) {
          var einTag = kreisabschnittBerechnung(90, mensLeft);
        } else {
          var einTag = kreisabschnittBerechnung(90, mensLength);
        }
        var bogenPosition = einTag * mensLeft;
        var resultToString = bogenPosition.toString();
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
      console.log("in FollikelPhase");
      setCycleDaysLeft = daysLeft;
      // in Follikelphase
      imgSrc = require("../assets/Circle/Indicators/empty.png");
      // Berechnung des Abstands zum roten Balken
      var einTag = kreisabschnittBerechnung(270, gF);
      console.log("Ein Tag: " + einTag);
      var bogenPosition = einTag * daysLeft + 80;
      console.log("Bogenposition: " + (bogenPosition + 80));
      var resultToString = bogenPosition.toString();
      degree = resultToString + "deg";
      return degree;
    }
  }

  function kreisabschnittBerechnung(grad, tage) {
    var abschnitt = grad / tage;
    return abschnitt;
  }

  useEffect(() => {
    getOldStuff();
  }, []);
  return (
    <View style={styles.container}>
      <View >
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
    paddingTop:"30%",
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

  }
});

export default IndexCircle;
