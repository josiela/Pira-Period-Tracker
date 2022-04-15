import React, { useState } from "react";
import { View, StyleSheet, TextInput, Pressable } from "react-native";
import colors from "../constants/colors";
import AddButton from "../components/AddButton";
import { CalendarList } from "react-native-calendars";

const IndexCal = (props) => {
  const [selectedDay, setSelectedDay] = useState("");
  let mark = {
    [selectedDay]: { selected: true, selectedColor: colors.accBlue },
  };

  function setDay(day) {
    console.log("function: " + day);
    setSelectedDay(day);
  }
  return (
    <View style={styles.imageBox}>
      <View style={styles.calBox}>
        <CalendarList
          calendarHeight={350}
          onDayPress={(day) => {
            const date = day.dateString;
            setDay(date);
          }}
          markedDates={mark}
          theme={{
            calendarBackground: colors.mainLG,
          }}
        />
      </View>
      <View style={styles.addButton}>
        <AddButton icon="plus" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBox: {
    height: "100%",
  },
  calBox: {
    height: 600,
    paddingTop: 75,
  },
  addButton: {
    alignItems: "flex-end",
    margin: 20,
  },
});

export default IndexCal;
