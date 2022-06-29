import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Animated,
  Image,
} from "react-native";

const IndexCircle = (props) => {
  var FollicularAndLutealLength = 22;
  var mensLength = 6;
  var totalDuration;
  var section;
  var degree = "0deg";
  // wird später durch actual data ersetzt
  const daysLeft = 22;

  var imgSrc;

  if (daysLeft <= 22 && daysLeft > 0) {
    imgSrc = require("../assets/Circle/Indicators/empty.png");
  } else if (daysLeft == 0) {
    imgSrc = require("../assets/Circle/Indicators/spotting.png");
  }

  // berechnet die gesamte Zykluslänge
  function calculateTotalDuration(FollicularAndLutealLength, mensLength) {
    var totalDuration = FollicularAndLutealLength + mensLength;
    console.log(totalDuration);
    var section = 360 / totalDuration;
    // +90 because the top part is at 90deg and not at 0deg
    var currentState = daysLeft * section + 90;
    var resultToString = currentState.toString();
    degree = resultToString + "deg";
    console.log(degree);
    return degree;
  }

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Image
          source={require("../assets/Circle/circle.png")}
          style={{
            transform: [
              {
                rotate: calculateTotalDuration(
                  FollicularAndLutealLength,
                  mensLength
                ),
              },
            ],
            position: "relative",
            justifyContent: "flex-start",
          }}
        />
        <Image source={imgSrc} style={styles.indicator} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    position: "relative",
    justifyContent: "flex-start",
  },
  indicator: {
    position: "absolute",
    justifyContent: "flex-start",
    alignSelf: "center",
    top: "6%",
  },
});

export default IndexCircle;
