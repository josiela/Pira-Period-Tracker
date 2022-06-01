import React, { useState } from "react";
import { View, StyleSheet, TextInput, Pressable, Animated } from "react-native";
import colors from "../constants/colors";
import AddButton from "../components/AddButton";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { color } from "react-native-elements/dist/helpers";

/* 
TODO: 
- Set minDay to first entry-month
- Arrows are not shown
*/

const IndexCal = (props) => {
  const [selectedDay, setSelectedDay] = useState("");
  let mark = {
    [selectedDay]: {
      selected: true,
      color: colors.accBlue,
      startingDay: true,
      endingDay: true,
      textColor: "white",
    },
    "2022-05-03": {
      color: "#F08080",
      startingDay: true,
      textColor: "white",
    },
    "2022-05-07": {
      color: "#F08080",
      endingDay: true,
      textColor: "white",
    },
  };

  function setDay(day) {
    console.log("Ausgewählter Tag: " + day);
    setSelectedDay(day);
  }
  return (
    <View style={styles.imageBox}>
      <View style={styles.calBox}>
        <Calendar
          theme={{ arrowColor: colors.accBlue }}
          markingType={"period"}
          markedDates={mark}
          hideArrows={false}
          // minDate={"2012-05-10"}
          onDayPress={(day) => {
            const date = day.dateString;
            setDay(date);
          }}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {
            console.log("month changed", month);
          }}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={true}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
          firstDay={1}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          //onPressArrowLeft={(subtractMonth) => subtractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          //onPressArrowRight={(addMonth) => addMonth()}
          // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
          disableAllTouchEventsForDisabledDays={true}
          // Enable the option to swipe between months. Default = false
          enableSwipeMonths={true}
        />
      </View>
      <View style={styles.addButton}>
        <AddButton navigation={props.navigation} icon="plus" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBox: {
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
  calBox: {
    paddingTop: 75,
  },
  addButton: {
    alignItems: "flex-end",
    margin: 20,
  },
});

export default IndexCal;
