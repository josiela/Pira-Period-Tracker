import React from "react";
import { View, Image } from "react-native";

/**
 * UILogo Component
 * @author Aiden <aiden.roessler@haw-hamburg.de>
 * @author Josie <joseffa.steuernagel@haw-hamburg.de>
 *
 * @param {*} props
 * @returns UI Logo
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
      ImgSrc = require("../assets/lock.png");
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
