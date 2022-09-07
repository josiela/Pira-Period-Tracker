import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMyObjectStuff, getMyStringStuff } from "../database/CreateDatabase";

import Entry from "../database/EntryClass";
import React, {  useState } from "react";

let firstEntry = new Entry("2027-08-01", 2, 3, 4, "Nichts Sonderliches");
let entryArray=[firstEntry,firstEntry];
let firstMensDaysArray=[];
let mensLengthsArray=[];
let counter=1;

const getArray = async () => {
  console.log("GetArray aufgerufen");
  await getMyStringStuff("@entryArrayKey").then((returnedValue) => {
    if (returnedValue !== null) {
      entryArray=(JSON.parse(returnedValue));
    } else {
      entryArray=([firstEntry]);
    }
  });

};

//Macht aus 9 09 und so weiter für korrekte datenform
const fixDate =(number)=>{
  let fixedNumber;
  fixedNumber: number<10
  ? fixedNumber= "0"+number
  : fixedNumber = JSON.stringify(number);
  return fixedNumber;
}

// Für jeden Eintrag mit Blutung in DB schauen, ob der Tag davor auch ein Tag mit blutung ist (oder 2 davor)
//Wenn ja-> für den tag davor das gleiche tun
//Wenn man am ende angekommen ist-> schrittweite, die man gegangen ist= Menslänge für das mal I guess

//Prüft, ob der Tag der erste der blutung in diesem zyklus war, und packt ihn in das firstMensDaysArray, wenn ja
const checkIfFirstDay=(entry)=>{
  if(entry.blood!==""){console.log("Bluuut am : "+entry.date);
  console.log("checkIfFirstDayLength aufgerufen" + entry.date);
  

  let tryVar= entry.date[8]+entry.date[9];
  let dayNumber= parseInt(tryVar);

  tryVar= entry.date[5]+entry.date[6];
  let monthNumber= parseInt(tryVar);

  tryVar= entry.date[0]+entry.date[1]+entry.date[2]+entry.date[3];
  let yearNumber= parseInt(tryVar);

  let dayBefore=0;
 

  //Berechne den Tag davor
  if(dayNumber!=1){
    dayBefore=JSON.stringify(yearNumber+"-"+fixDate(monthNumber)+"-"+fixDate(dayNumber-1));
    console.log("Day Before:"+dayBefore);
  }
  else if(dayNumber==1 && monthNumber ==1){
    dayBefore=JSON.stringify((yearNumber-1)+"-"+12+"-"+31);
    console.log("Day Before:"+dayBefore);
  }
  else if(dayNumber==1 && monthNumber ==3){
    if(yearNumber%4==0){
      dayBefore=JSON.stringify(yearNumber+"-"+fixDate(2)+"-"+29);
      console.log("Day Before:"+dayBefore);
    }
    else{
      dayBefore=JSON.stringify(yearNumber+"-"+fixDate(2)+"-"+28);
      console.log("Day Before:"+dayBefore);
    }
  }
  else if(dayNumber==1 && (monthNumber ==2 ||monthNumber ==4 ||monthNumber ==6||monthNumber ==8||monthNumber ==9||monthNumber ==11)){
    dayBefore=JSON.stringify(yearNumber+"-"+fixDate(monthNumber-1)+"-"+31);
    console.log("Day Before:"+dayBefore);
  }
  else if(dayNumber==1 && (monthNumber ==3 ||monthNumber ==5 ||monthNumber ==7||monthNumber ==10||monthNumber ==12)){
    dayBefore=JSON.stringify(yearNumber+"-"+fixDate(monthNumber-1)+"-"+30);
    console.log("Day Before:"+dayBefore);
  }


  //Prüfe, ob Tag davor in der DB ist
  console.log("Teeeeeeeest"+(entryArray.find((littleEntry) =>  littleEntry.date === "2022-09-02" ))instanceof Entry);
  if(entryArray.find((littleEntry) =>  (JSON.stringify(littleEntry.date) === dayBefore ) && (((littleEntry.blood) === "1"  )||((littleEntry.blood) === "2"  )||((littleEntry.blood) === "3"  )) )){
    
        console.log("Am Tag davor wurde was blutiges eingetragen"+dayBefore);
        
        console.log("Der Tag davor hatte auch Blutung!");
        
      }else{
        console.log("Am tag davor war kein Eintrag");
        firstMensDaysArray.push(entry);
        
      }
    }
};


const lengthofMens=(entry)=>{
  
  console.log("lengthofMens aufgerufen" + entry.date);


  let tryVar= entry.date[8]+entry.date[9];
  let dayNumber= parseInt(tryVar);

  tryVar= entry.date[5]+entry.date[6];
  let monthNumber= parseInt(tryVar);

  tryVar= entry.date[0]+entry.date[1]+entry.date[2]+entry.date[3];
  let yearNumber= parseInt(tryVar);

  let dayAfter=0;

  //Berechne den Tag danach
  if(dayNumber==31 && monthNumber==12){
    dayAfter=JSON.stringify((yearNumber+1)+"-"+fixDate(1)+"-"+fixDate(1));
    console.log("Day After:"+dayAfter);
  }
  if(dayNumber==31 && monthNumber<=11){
    dayAfter=JSON.stringify(yearNumber+"-"+fixDate(monthNumber+1)+"-"+fixDate(1));
    console.log("Day After:"+dayAfter);
  }
  else if(dayNumber==30 && ((monthNumber ==4)||(monthNumber ==6)||(monthNumber ==9)||(monthNumber ==11))){
    dayAfter=JSON.stringify(yearNumber+"-"+fixDate(monthNumber+1)+"-"+fixDate(1));
    console.log("Day Before:"+dayAfter);
  }
  else if(dayNumber==31 && ((monthNumber ==1)||(monthNumber ==3)||(monthNumber ==5)||(monthNumber ==7)||(monthNumber ==8)||(monthNumber ==10))){
    dayAfter=JSON.stringify(yearNumber+"-"+fixDate(monthNumber+1)+"-"+fixDate(1));
    console.log("Day Before:"+dayAfter);
  }
  else if(monthNumber==2 && (dayNumber ==28 ||dayNumber ==29 )){
    if(dayNumber==28){
      if (yearNumber%4==0){
        dayAfter=JSON.stringify(yearNumber+"-"+fixDate(2)+"-"+29);
      }else{
        dayAfter=JSON.stringify(yearNumber+"-"+fixDate(3)+"-"+fixDate(1));
      }
    }else{
      dayAfter=JSON.stringify(yearNumber+"-"+fixDate(3)+"-"+fixDate(1));
    }
  }else{
    dayAfter=JSON.stringify(yearNumber+"-"+fixDate(monthNumber)+"-"+fixDate(dayNumber+1));
  }

  console.log("Der nächste Tag ist: "+ dayAfter);

  //Prüfe, ob Tag danach in der DB ist
   if(entryArray.find((littleEntry) =>  (JSON.stringify(littleEntry.date) === dayAfter ) && (((littleEntry.blood) === "1"  )||((littleEntry.blood) === "2"  )||((littleEntry.blood) === "3"  )) )){
    
        console.log("Am Tag danach wurde was blutiges eingetragen "+dayAfter);
        counter+=1;
        lengthofMens(entryArray.find((littleEntry) =>  (JSON.stringify(littleEntry.date) === dayAfter )));
        
      }else{
        
        console.log("Am tag danach keine Blutung, die Länge hier beträgt: " +counter);

        //Zwischenblutungen sollen nicht eingetragen werden
        if(counter>1){mensLengthsArray.push(counter);}
        counter=1;
      }
    
};

const justPrintTheArray=(length)=>{
  console.log(length)
};

const printEntryArray=(entry)=>{
  console.log(entry.date);
};

export const startCalculatingMensLengths = () => {
  
  console.log("startCalculatingMensLengths aufgerufen");
  getArray();

  //entryArray.forEach(printEntryArray);
  entryArray.forEach(checkIfFirstDay);
  firstMensDaysArray.forEach(lengthofMens);
  mensLengthsArray.forEach(justPrintTheArray);
  firstMensDaysArray.forEach(printEntryArray);

};



//Nächster schritt: Warum werden die firstMensDays mit jedem speichern in dem Array verdoppelt? 
//Noch verbessern: auch einen tag pause lassen können bei checkIfFirstday
//Am ende noch einmal aufrufen, da es immer ein "speichern" hinterherhinkt