import React, { useState } from "react";
import { View, StyleSheet, TextInput, Pressable } from "react-native";
import colors from "../constants/colors";
import UILogo from "./UILogo";

const AddButton = (props) => {
  return (
    <View>
      <Pressable onPress={() => console.log("pressed")}>
        <UILogo src={props.icon} styleType={props.sizeStyle} />
      </Pressable>
    </View>
  );
};

export default AddButton;
