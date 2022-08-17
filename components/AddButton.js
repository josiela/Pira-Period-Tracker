import React from "react";
import { View, Pressable } from "react-native";
import UILogo from "./UILogo";

const AddButton = (props) => {
  return (
    <View>
      <Pressable
        onPress={() =>
          props.navigation.navigate("AddEntryScreen", {
            date: props.date,
          })
        }
      >
        <UILogo src={props.icon} styleType={props.sizeStyle} />
      </Pressable>
    </View>
  );
};

export default AddButton;
