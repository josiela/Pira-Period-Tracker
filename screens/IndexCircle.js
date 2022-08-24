import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const IndexCircle = (props) => {
  var degree = "80deg";

  console.log("Heute ist: " + props.date);

  // get date aus Datenbank später:
  //------------//
  //Menstruationslänge
  var mensLength = 6; // aus Datenbank
  //gesamte Zycluslänge
  var totalLength = 28; // aus Datenbank
  // Timestamp des nächsten Zyklusbeginns
  var nextCycle = new Date(2022, 7, 28).getTime(); // aus Datenbank
  //-----------//
  var setCycleDaysLeft = totalLength;
  var days = "Tage";
  var status = "bis zur nächsten Periode";

  var imgSrc;

  function cyclusPositionBerechnung(cycleLength, menstruationLength) {
    // Follikel und Luteal Länge (gF)
    var gF = cycleLength - menstruationLength;
    //--- übrige Tage berechnen ---//
    const oneDay = 1000 * 60 * 60 * 24;
    // +1 sonst wird heute nicht mitgezählt
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
        // Position auf Kreis muss berechnet werden
        var mensLeft = daysLeft - (cycleLength - menstruationLength);
        setCycleDaysLeft = mensLeft;
        console.log("MensDays left: " + mensLeft);
        var einTag = kreisabschnittBerechnung(90, menstruationLength);
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

  return (
    <View style={styles.container}>
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
          <Text>
            {setCycleDaysLeft} {days}
          </Text>
          <Text>{status}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  circleContainer: {
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
    top: "6%",
  },
  daysLeftText: {
    position: "absolute",
    alignItems: "center",
  },
});

export default IndexCircle;
