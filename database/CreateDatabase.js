import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

//Erklärung unter: https://react-native-async-storage.github.io/async-storage/docs/api
export const storeMyStuff = async (key, stuff) => {
  try {
    const jsonValue = JSON.stringify(stuff);
    AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (e) {
    alert("Speichern von Objekt fehlgeschlagen");
  }
};

export const storeMyStringStuff = async (key, stuff) => {
  try {
    AsyncStorage.setItem(key, stuff);
  } catch (e) {
    alert("Speichern von String fehlgeschlagen");
  }
};

export const getMyStringStuff = async (key) => {
  var storageStuff = await AsyncStorage.getItem(key);
  if (storageStuff != null) {
    return storageStuff;
  } else {
    Alert("No Password found in Database");
  }
};

export const getMyObjectStuff = (key) => {
  try {
    const jsonValue = AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    Error("My Object won't leave the Database");
  }
};

export const removeMyStuff = (key) => {
  try {
    AsyncStorage.removeItem(key);
  } catch (e) {
    Error("This Stuff is resistant and couldn't be removed"); // remove error
  }
};

//Returns an Array of all Keys of the database
export const getAllKeys = async () => {
  let keys = [];
  try {
    keys = AsyncStorage.getAllKeys();
    return keys;
  } catch (e) {
    Error("I can't find every Key"); // remove error
  }
  console.log(keys);
};
