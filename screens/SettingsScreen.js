import { useEffect, React } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import Settings from "../components/Settings";
import colors from "../constants/colors";
import { normalizeH } from "../constants/fontResponsive";

/**
 * @author Aiden <aiden.roessler@haw-hamburg.de>
 * @author Mona <mona.vonhein@haw-hamburg.de> for Style
 * SettingsScreen taking the Settings component. Hands over an array of input, subTitle and onPress events
 *
 * @param {*} props
 * @returns Settingsscreen
 *
 * */

const SettingsScreen = (props) => {
  const settingsOptions = [
    {
      title: "Passwort ändern",
      subTitle: null,
      onPress: () => props.navigation.navigate("ChangePW"),
    },
    {
      title: "Mens- und Zykluslänge ändern",
      subTitle: null,
      onPress: () => props.navigation.navigate("MensundZyklus"),
    },

    {
      title: "Über uns",
      subTitle: null,
      onPress: () => props.navigation.navigate("LateAboutUs"),
    },
    {
      title: "über Längen und Verhütung",
      subTitle: null,
      onPress: () => props.navigation.navigate("Info"),
    },
    {
      title: "App zurücksetzen",
      subTitle: null,
      onPress: () => props.navigation.navigate("DeleteScreen"),
    },
  ];
  useEffect(() => {
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Settings und Infos</Text>
      </View>
      <View style={styles.bigView}>
        <View style={styles.container2}>
          <Image
            style={styles.icon}
            onPress={() => (this.opacity = 0.2)}
            source={require("../assets/lock.png")}
          />
          <Image
            style={styles.icon2}
            onPress={() => (this.opacity = 0.2)}
            source={require("../assets/PeriodenundZykluslänge.png")}
          />

          <Image
            style={styles.icon3}
            onPress={() => (this.opacity = 0.2)}
            source={require("../assets/ueberuns.png")}
          />
          <Image
            style={styles.icon2}
            onPress={() => (this.opacity = 0.2)}
            source={require("../assets/Medical.png")}
          />
          <Image
            style={styles.icon2}
            onPress={() => (this.opacity = 0.2)}
            source={require("../assets/BigX.png")}
          />
        </View>
        <View style={styles.container3}>
          <Settings settingsOptions={settingsOptions} style={styles.text} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: "14%",
    color: colors.accBlue,
    fontSize: normalizeH(15),
    lineHeight: normalizeH(22),
  },
  bigView: {
    height: "100%",

    flexDirection: "row",
  },

  container2: {
    width: "18%",
    height: "63%",
    marginTop: "10%",
  },
  container3: {
    marginTop: "10%",
    width: "80%",
    height: "80%",
  },
  icon: {
    marginBottom: "45%",
    width: normalizeH(22),
    height: normalizeH(22),
  },
  icon2: {
    marginBottom: "45%",
    width: normalizeH(19.7),
    height: normalizeH(22),
  },
  icon3: {
    marginBottom: "45%",
    width: normalizeH(23),
    height: normalizeH(20),
  },
  icon4: {
    marginBottom: "45%",
    width: normalizeH(23),
    height: normalizeH(23),
  },
  text: {
    lineHeight: normalizeH(10),
    color: colors.mainBlk,
    fontSize: normalizeH(9),
  },

  container: {
    paddingVertical: normalizeH(20),
    paddingHorizontal: "7%",
    height: "100%",
    width: "100%",
  },
});

export default SettingsScreen;
