import { Dimensions, Platform, PixelRatio } from "react-native";

/**
 * function to create responsive fonts
 * @author Mona <mona.vonhein@haw-hamburg.de>
 */

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 4;
  }
}

const scale2 = SCREEN_HEIGHT / 320;

export function normalizeH(size) {
  const newSize = size * scale2;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 4;
  }
}
