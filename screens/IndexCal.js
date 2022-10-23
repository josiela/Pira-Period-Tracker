import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import colors from "../constants/colors";
import AddButton from "../components/AddButton";
import { Calendar } from "react-native-calendars";
import {
  getMyStringStuff,
  removeMyStuff,
  storeMyStuff,
} from "../database/CreateDatabase";

/**
 * IndexCalendar Screen
 * 
 * @author Josie <joseffa.steuernagel@haw-hamburg.de>
 * 
 * @return IndexCal
 * 
 * TODO: 
- Heutigen Tag anzeigen
- Periode berechnen und in mark schreiben
 */

const IndexCal = (props) => {
  const [selectedDayNumber, setSelectedDayNumber] = useState(1);
  const [selectedMonthNumber, setSelectedMonthNumber] = useState(1);
  const [selectedYearNumber, setSelectedYearNumber] = useState(2022);

  const convertDate = () => {
    // converts date to calender date string
    let convertedDate = new Date();
    let ISOString = convertedDate.toISOString();
    let splitISOString = ISOString.slice(0, ISOString.indexOf("T"));
    return splitISOString;
  };

  const [selectedDay, setSelectedDay] = useState(convertDate());
  const [entryArray, setEntryArray] = useState([]);

  let mark = {
    [selectedDay]: {
      selected: true,
      color: colors.accBlue,
      startingDay: true,
      endingDay: true,
      textColor: "white",
    },
    [convertDate()]: {
      selected: true,
      color: colors.accBlue,
      startingDay: true,
      endingDay: true,
      textColor: "white",
    },
    "2022-08-03": {
      color: "#F08080",
      startingDay: true,
      endingDay: false,
      textColor: "white",
    },
    "2022-08-04": {
      color: "#F08080",
      startingDay: false,
      endingDay: false,
      textColor: "white",
    },
    "2022-08-07": {
      color: "#F08080",
      endingDay: true,
      textColor: "white",
    },
  };

  const setDay = (day) => {
    setSelectedDay(day);
  };

  const setDateNumbers = (day) => {
    setSelectedDayNumber(day.day);
    setSelectedMonthNumber(day.month);
    setSelectedYearNumber(day.year);
    //calculateDates();
  };

  // Get EntryArray from database
  const getArray = async () => {
    await getMyStringStuff("@entryArrayKey").then((returnedValue) => {
      if (returnedValue !== null) {
        setEntryArray(JSON.parse(returnedValue));
      } else {
        setEntryArray([]);
      }
    });
  };

  console.log("aufrufen");
  getArray();
  console.log("done");
  console.log(
    "Hallo I versuch hier grad Daten zu ziehen: " +
      JSON.stringify(entryArray[0])
  );

  /*function calculateDates() {
    console.log(
      "Cycle Calc: " +
        CycleCalc(selectedDayNumber, selectedMonthNumber, selectedYearNumber)
    );
  }*/

  return (
    <View style={styles.imageBox}>
      <View style={styles.calBox}>
        <Calendar
          theme={{
            arrowColor: colors.accBlue,
            backgroundColor: colors.mainLG,
            calendarBackground: colors.mainLG,
          }}
          markingType={"period"}
          markedDates={mark}
          hideArrows={false}
          // minDate={"2012-05-10"}
          onDayPress={(day) => {
            const date = day.dateString;
            setDay(date);
            setDateNumbers(day);
          }}
          onDayLongPress={(day) => {
            setDay(day.dateString);
            props.navigation.navigate("AddEntryScreen", {
              date: day.dateString,
            });
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
        <AddButton
          navigation={props.navigation}
          icon="plus"
          date={selectedDay}
        />
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
