import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import colors from "../constants/colors";
import AddButton from "../components/AddButton";
import { Calendar } from "react-native-calendars";
import {
  getMyStringStuff,
  removeMyStuff,
  storeMyStuff,
} from "../database/CreateDatabase";
import { useIsFocused } from "@react-navigation/native";

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
  // to check if screen is active
  const isFocused = useIsFocused();
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
  const [nextMensBeginning, setNextMensBeginning] = useState("");
  const [mensLength, setMensLength] = useState(6);
  const [daysOfPeriod, setDaysOfPeriod] = useState([]);

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
    [nextMensBeginning]: {
      selected: true,
      color: colors.accOrange,
      startingDay: true,
      endingDay: true,
      textColor: "white",
    },
  };

  // gets data from database when screen is focused
  useEffect(() => {
    getDBData();
  }, [isFocused]);

  // calculate days of period if mensLength or nextMensBeginning changes
  useEffect(() => {
    calculatePeriodDates(nextMensBeginning);
  }, [mensLength || nextMensBeginning]);

  // get Period Date from database
  const getDBData = async () => {
    // day of next menstruation beginning
    await getMyStringStuff("@firstDayKey").then((returnedValue) => {
      if (returnedValue !== null) {
        setNextMensBeginning(returnedValue);
      } else {
        console.log("NextMensBeginning ist leer");
      }
    });

    //length of menstruation
    await getMyStringStuff("@mensLength").then((returnedValue) => {
      if (returnedValue !== null) {
        setMensLength(JSON.parse(returnedValue));
      } else {
        console.log("Error: No Menslength set");
      }
    });
    // Entry Array
    await getMyStringStuff("@entryArrayKey").then((returnedValue) => {
      if (returnedValue !== null) {
        setEntryArray(JSON.parse(returnedValue));
      } else {
        console.log("No data in EntryArray");
        setEntryArray([]);
      }
    });
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

  // add entries to mark
  for (const element of entryArray) {
    mark[element.date] = {
      color: colors.mainG,
      startingDay: true,
      endingDay: true,
      textColor: "white",
    };
  }

  // Tage der nächsten Periode markieren
  for (const [index, day] of daysOfPeriod.entries()) {
    if (index === 0) {
      mark[day] = {
        color: colors.accOrange,
        startingDay: true,
        endingDay: false,
        textColor: "white",
      };
    } else if (index === daysOfPeriod.length - 1) {
      mark[day] = {
        color: colors.accOrange,
        startingDay: false,
        endingDay: true,
        textColor: "white",
      };
    } else {
      mark[day] = {
        color: colors.accOrange,
        startingDay: false,
        endingDay: false,
        textColor: "white",
      };
    }
  }

  //berechnet die einzelnen Tage der Periode und fasst sie im Array DaysOfPeriod zusammen
  //date muss format yyyy-mm-dd type=string haben
  const calculatePeriodDates = (date) => {
    //Datum in number unterteilen
    const initialDateArray = date.split("-");
    const day = Number(initialDateArray[2]);
    const month = Number(initialDateArray[1]);
    const year = Number(initialDateArray[0]);

    let newDateArray = [date];

    let calculatedDay = day;
    let calculatedMonth = month;
    let calculatedYear = year;

    //berechnung
    for (let i = 1; i < mensLength; i++) {
      let newDay = calculatedDay + 1;
      let newMonth = calculatedMonth;
      let newYear = calculatedYear;
      if (
        calculatedMonth === 1 ||
        calculatedMonth === 3 ||
        calculatedMonth === 5 ||
        calculatedMonth === 7 ||
        calculatedMonth === 8 ||
        calculatedMonth === 10 ||
        calculatedMonth === 12
      ) {
        if (newDay > 31) {
          newDay = newDay % 31;
          if (calculatedMonth < 12) {
            newMonth = calculatedMonth + 1;
          } else {
            newMonth = (calculatedMonth + 1) % 12;
            newYear = calculatedYear + 1;
          }
        }
      } else if (calculatedMonth === 2) {
        if (calculatedYear % 4 === 0) {
          if (newDay > 29) {
            newDay = newDay % 29;
            newMonth = calculatedMonth + 1;
          } else {
            newMonth = calculatedMonth;
          }
        } else {
          if (newDay > 28) {
            newDay = newDay % 28;
            newMonth = calculatedMonth + 1;
          } else {
            newMonth = calculatedMonth;
          }
        }
      } else if (
        calculatedMonth === 4 ||
        calculatedMonth === 6 ||
        calculatedMonth === 9 ||
        calculatedMonth === 11
      ) {
        if (newDay > 30) {
          newDay = newDay % 30;
          newMonth = calculatedMonth + 1;
        }
      }
      // neue Werte setzen
      calculatedDay = newDay;
      calculatedMonth = newMonth;
      calculatedYear = newYear;

      //Datum zusammen fügen
      let dayString;
      let monthString = String(calculatedMonth);
      let yearString = String(calculatedYear);
      if (calculatedDay < 10) {
        dayString = "0" + String(calculatedDay);
      } else dayString = String(calculatedDay);

      let dateString = yearString + "-" + monthString + "-" + dayString;

      // add dateString to array
      newDateArray.push(dateString);
    }
    setDaysOfPeriod(newDateArray);
  };

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
