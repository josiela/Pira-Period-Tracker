import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import colors from "../constants/colors";
import { Calendar } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import { normalizeH } from "../constants/fontResponsive";
/**
 * This is the Calendar Screen for Starters.
 * It holds the "When you had your last mens?" Question ft. the
 * Calendar component.
 *
 * ToDo: Navigation Bar
 * may find another solution for the marked Dates, it's just a dummy rn
 * also find a way to get the input outta it but that's prob. a diff issue
 *
 */
LocaleConfig.locales["de"] = {
  monthNames: [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ],
  monthNamesShort: [
    "Jan.",
    "Feb.",
    "März",
    "April",
    "Mai",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sept.",
    "Okt.",
    "Nov.",
    "Dez.",
  ],
  dayNames: [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ],
  dayNamesShort: ["So", "Mo", "Di", "Mi", "Do", "Sa"],
  today: "heute",
};
LocaleConfig.defaultLocale = "de";

const CalendarScreen = (props) => {
  const [selectedDay, setSelectedDay] = useState("");
  let mark = {
    [selectedDay]: { selected: true, selectedColor: colors.accBlue },
  };

  function setDay(day) {
    console.log("function: " + day);
    setSelectedDay(day);
  }

  return (
    //props.header is given when calling the Screen
    <View style={styles.container}>
      <Text style={styles.title}>Deine letzte Periode</Text>
      <Text style={styles.infoText}>
        Bitte tippe den ersten Tag deiner letzten Periode an und klicke
        anschließend den Button zum Bestätigen.
      </Text>
      <Calendar
        onDayPress={(day) => {
          const date = day.dateString;
          setDay(date);
        }}
        markedDates={mark}
        enableSwipeMonths={true}
        theme={{
          calendarBackground: colors.mainLG,
        }}
      />
      <View style={styles.button}>
        <Pressable
          style={styles.button1}
          onPress={() => props.navigation.navigate("AddEntryScreen")}
        >
          <Text style={styles.text}>{props.title}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: normalizeH(20),
    paddingHorizontal: "7%",
    height: "100%",
    width: "100%",
  },

  title: {
    marginBottom: "15%",
    marginTop: "18%",
    color: colors.accBlue,
    fontSize: normalizeH(15),
    lineHeight: normalizeH(22),
  },

  infoText: {
    paddingBottom: "10%",
    lineHeight: normalizeH(9),
    color: colors.mainG,
    fontSize: normalizeH(7),
  },

  button: {
    margin: 50,
    elevation: 5,
  },
  text: {
    color: colors.mainLG,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
  },
  button1: {
    borderRadius: 8,
    height: 40,
    elevation: 3,
    backgroundColor: colors.accBlue,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CalendarScreen;
