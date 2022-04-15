import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";

/**
 * UILogo Component for two screens.
 * 1 Lock Symbol and the preferences Screen.
 * @param {*} props
 * @returns
 */
const UILogo = (props) => {
  // set logo path dependent on what prop name was given
  var LogoStyle =
    props.styleType === "tiny"
      ? { width: 40, height: 50, resizeMode: "contain" }
      : { width: 60, height: 70, resizeMode: "contain" };
  var ImgSrc;

  switch (props.src) {
    case "lock":
      ImgSrc = require("../assets/iE-wdltA.png");
      break;
    case "plus":
      ImgSrc = require("../assets/plus.png");
      break;
    case "gear":
      ImgSrc = require("../assets/settings.png");
      break;
    default:
      ImgSrc = require("../assets/settings.png");
  }

  return (
    <View>
      <Image style={LogoStyle} source={ImgSrc} />
    </View>
  );
};

export default UILogo;
