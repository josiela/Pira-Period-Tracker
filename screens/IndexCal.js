import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import colors from "../constants/colors";
import AddButton from "../components/AddButton";
import { Calendar } from "react-native-calendars";
import {
  getMyStringStuff,
  removeMyStuff,
  storeMyStuff,
  getMyObjectStuff,
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
  const [daysOfPastMens, setDaysOfPastMens] = useState([]);
  const [collectedDaysOfPastMens, setCollectedDaysOfPastMens] = useState([]);
  const [calculatedArrayOfPastMens, setCalculatedArrayOfPastMens] = useState(
    []
  );

  let mark = {
    //ausgewählter Tag
    [selectedDay]: {
      selected: true,
      color: colors.accBlue,
      startingDay: true,
      endingDay: true,
      textColor: "white",
    },
    //heute
    [convertDate()]: {
      selected: true,
      color: colors.accBlue,
      startingDay: true,
      endingDay: true,
      textColor: "white",
    },
    //Beginn der nächsten Menstruation
    [nextMensBeginning]: {
      selected: true,
      color: colors.accOrange,
      startingDay: true,
      endingDay: true,
      textColor: "white",
    },
  };

  // Reagiert auf Anlegen eines neuen Eintrags und zieht darauf hin die neuen Daten
  useEffect(() => {
    getDBData();
  }, [props.route.params?.update]);

  // Berechnet die Periodentage nachdem die Daten aus der DB gezogen wurden
  useEffect(() => {
    calculatePeriodDates(nextMensBeginning);
  }, [nextMensBeginning]);

  useEffect(() => {
    console.log("********", daysOfPastMens);
    if (daysOfPastMens != undefined || daysOfPastMens != null) {
      for (const element of daysOfPastMens) {
        if (!collectedDaysOfPastMens.includes(element.date)) {
          setCollectedDaysOfPastMens((oldArray) => [...oldArray, element.date]);
        }
      }
      calculatedPastPeriodDates();
    }
  }, [daysOfPastMens]);

  // gets data from database when screen is focused
  useEffect(() => {
    getDBData();
    calculatePeriodDates(nextMensBeginning);
  }, [isFocused]);

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

    await getMyStringStuff("@firstMensDaysArray").then((returnedValue) => {
      try {
        setDaysOfPastMens(JSON.parse(returnedValue));
      } catch (error) {
        console.log("Can't get past mens dates");
      }
    });
  };

  const setDay = (day) => {
    setSelectedDay(day);
  };

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
      let monthString;
      if (calculatedMonth < 10) {
        monthString = "0" + String(calculatedMonth);
      } else monthString = String(calculatedMonth);
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

  const calculatedPastPeriodDates = () => {
    //Datum in number unterteilen
    for (let i = 0; i < collectedDaysOfPastMens.length; i++) {
      const date = collectedDaysOfPastMens[i];
      if (!calculatedArrayOfPastMens.includes(date)) {
        ("eimmal hinzufügen bitte danke");
        setCalculatedArrayOfPastMens((oldArray) => [...oldArray, date]);
      }
      const initialDateArray = date.split("-");
      const day = Number(initialDateArray[2]);
      const month = Number(initialDateArray[1]);
      const year = Number(initialDateArray[0]);

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
        let monthString;
        if (calculatedMonth < 10) {
          monthString = "0" + String(calculatedMonth);
        } else monthString = String(calculatedMonth);
        let yearString = String(calculatedYear);
        if (calculatedDay < 10) {
          dayString = "0" + String(calculatedDay);
        } else dayString = String(calculatedDay);

        let dateString = yearString + "-" + monthString + "-" + dayString;

        // add dateString to array
        if (!calculatedArrayOfPastMens.includes(dateString)) {
          setCalculatedArrayOfPastMens((oldArray) => [...oldArray, dateString]);
        }
      }
    }
  };

  // add entries to mark
  for (const element of entryArray) {
    if (element.date !== selectedDay && element.date !== convertDate()) {
      if (element.blood === "") {
        mark[element.date] = {
          color: colors.mainG,
          startingDay: false,
          endingDay: false,
          textColor: "white",
        };
      } else {
        mark[element.date] = {
          color: colors.accOrange,
          startingDay: false,
          endingDay: false,
          textColor: "white",
        };
      }
    } else {
      mark[element.date] = {
        color: colors.accBlue,
        startingDay: false,
        endingDay: false,
        textColor: "white",
      };
    }
  }

  // Tage der nächsten Periode markieren
  for (const [index, day] of daysOfPeriod.entries()) {
    if (index === 0) {
      if (day !== selectedDay && day !== convertDate()) {
        mark[day] = {
          color: colors.accOrange,
          startingDay: true,
          endingDay: false,
          textColor: "white",
        };
      } else {
        mark[day] = {
          color: colors.accBlue,
          startingDay: true,
          endingDay: false,
          textColor: "white",
        };
      }
    } else if (index === daysOfPeriod.length - 1) {
      if (day !== selectedDay && day !== convertDate()) {
        mark[day] = {
          color: colors.accOrange,
          startingDay: false,
          endingDay: true,
          textColor: "white",
        };
      } else {
        mark[day] = {
          color: colors.accBlue,
          startingDay: false,
          endingDay: true,
          textColor: "white",
        };
      }
    } else {
      if (day !== selectedDay && day !== convertDate()) {
        mark[day] = {
          color: colors.accOrange,
          startingDay: false,
          endingDay: false,
          textColor: "white",
        };
      } else {
        mark[day] = {
          color: colors.accBlue,
          startingDay: false,
          endingDay: false,
          textColor: "white",
        };
      }
    }
  }

  //letzte Perioden markieren
  for (const [index, day] of calculatedArrayOfPastMens.entries()) {
    if (index % parseInt(mensLength) === 0) {
      if (day !== selectedDay && day !== convertDate()) {
        mark[day] = {
          color: colors.accOrange,
          startingDay: true,
          endingDay: false,
          textColor: "white",
        };
      } else {
        mark[day] = {
          color: colors.accBlue,
          startingDay: true,
          endingDay: false,
          textColor: "white",
        };
      }
    } else if (index % parseInt(mensLength) === parseInt(mensLength) - 1) {
      if (day !== selectedDay && day !== convertDate()) {
        mark[day] = {
          color: colors.accOrange,
          startingDay: false,
          endingDay: true,
          textColor: "white",
        };
      } else {
        mark[day] = {
          color: colors.accBlue,
          startingDay: false,
          endingDay: true,
          textColor: "white",
        };
      }
    } else {
      if (day !== selectedDay && day !== convertDate()) {
        mark[day] = {
          color: colors.accOrange,
          startingDay: false,
          endingDay: false,
          textColor: "white",
        };
      } else {
        mark[day] = {
          color: colors.accBlue,
          startingDay: false,
          endingDay: false,
          textColor: "white",
        };
      }
    }
  }

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
          }}
          onDayLongPress={(day) => {
            setDay(day.dateString);
            props.navigation.navigate("AddEntryScreen", {
              date: day.dateString,
            });
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
