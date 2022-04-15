import AsyncStorage from '@react-native-async-storage/async-storage';
import { RefreshControlBase } from 'react-native';
import Entry from './EntryClass';


export const storeMyStuff=async(key, stuff)=>{
    try{
        AsyncStorage.setItem(key, JSON.stringify(stuff));
        return true;
    }catch(e){
        alert("Speichern fehlgeschlagen");
    }
};

export const getMyStuff=(key)=>{
    return new Promise((resolve,reject)=>{
        AsyncStorage.getItem(key).then(value=>{
            if(value!=null){
                resolve(value);
            }else{
                reject(Error("Beim Daten laden ist was schiefgelaufen"));
            }
        });
    }); 
};