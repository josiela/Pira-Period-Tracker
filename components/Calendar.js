import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ThemeProvider, Button } from "react-native-elements";

import colors from "../constants/colors";
import { LocaleConfig } from "react-native-calendars";

/**
 * fancy Calendar Component to include everywhere
 *  You'll find the docs here:
 *  https://www.npmjs.com/package/react-native-calendars#calendar
 *
 *
 * TODO: why doesn't it fuckin accept the fuckin backgroundcolor.. it's beyond me..
 *
 */

//Language props for the calendar
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

export default Calendar;
