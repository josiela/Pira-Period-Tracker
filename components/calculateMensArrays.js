import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMyObjectStuff, getMyStringStuff } from "../database/CreateDatabase";

import Entry from "../database/EntryClass";
import React, {  useState } from "react";

let firstEntry = new Entry("2027-08-01", 2, 3, 4, "Nichts Sonderliches");
let entryArray=[];
let firstMensDaysArray=[];
let mensLengthsArray=[];
let counter=1;
let oneDayBreakCounter=0;

//Holt EntryArray aus DB
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

const calculateDayBefore=(date)=>{
  //console.log("Der calcDayBefore wurde folgendes datum gegeben: "+date+ "vom datentyp: "+ typeof(date));
  
  let tryVar= date[9]+date[10];
  let dayNumber= parseInt(tryVar);

  tryVar= date[6]+date[7];
  let monthNumber= parseInt(tryVar);

  tryVar= date[1]+date[2]+date[3]+date[4];
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

  return dayBefore;
};


//Prüft, ob der Tag der erste der blutung in diesem zyklus war, und packt ihn in das firstMensDaysArray, wenn ja
const checkIfFirstDay=(entry)=>{
  console.log(entry.blood);
  if(entry.blood!=="" && entry.date!== 1){
 // console.log("Bluuut am : "+entry.date);
  console.log("checkIfFirstDay aufgerufen" + entry.date);
  
  let dayBefore= calculateDayBefore(JSON.stringify(entry.date));
  //Prüfe, ob Tag davor in der DB ist
  if(entryArray.find((littleEntry) =>  (JSON.stringify(littleEntry.date) === dayBefore ) && (((littleEntry.blood) === "1"  )||((littleEntry.blood) === "2"  )||((littleEntry.blood) === "3"  )) )){
        oneDayBreakCounter=0;
       // console.log("Am Tag davor wurde was blutiges eingetragen"+dayBefore);
        
       // console.log("Der Tag davor hatte auch Blutung!");
        
      }else{
        //Wenn nicht, prüfen ob zwei tage vorher was mit Blutung in der DB ist
       // console.log("Am tag davor war kein Eintrag");
        
          //console.log("Schauen wir aber noch einen Tag zurück:");
          
          
          let twoDaysBefore = calculateDayBefore(dayBefore);
        //  console.log("Two days before: "+twoDaysBefore);
          if(entryArray.find((littleEntry) =>  (JSON.stringify(littleEntry.date) === twoDaysBefore ) && (((littleEntry.blood) === "1"  )||((littleEntry.blood) === "2"  )||((littleEntry.blood) === "3"  )) )){
            //console.log("Zwei Tage vorher gab es aber blutung, der ursprungstag "+ entry.date+" kommt also nicht in die DB");
          }else{
            //console.log("Zwei Tage vorher gab es auch keine Blutung, also ab in die DB: mit dem "+ entry.date);
            firstMensDaysArray.push(entry);
          }
     
        
      }
    }
};

const calculateDayAfter=(date)=>{
  let tryVar= date[9]+date[10];
  let dayNumber= parseInt(tryVar);

  tryVar= date[6]+date[7];
  let monthNumber= parseInt(tryVar);

  tryVar= date[1]+date[2]+date[3]+date[4];
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
  
  console.log("An calcDayAfter wurde "+ date+"übergeben, der nächste Tag ist: "+ dayAfter);
  return dayAfter;
};


const lengthofMens=(entry)=>{
  

  let dayAfter=calculateDayAfter(JSON.stringify(entry.date));


  //Prüfe, ob Tag danach in der DB ist
   if(entryArray.find((littleEntry) =>  (JSON.stringify(littleEntry.date) === dayAfter ) && (((littleEntry.blood) === "1"  )||((littleEntry.blood) === "2"  )||((littleEntry.blood) === "3"  )) )){
    
      //  console.log("Am Tag danach wurde was blutiges eingetragen "+dayAfter);
        counter+=1;
        lengthofMens(entryArray.find((littleEntry) =>  (JSON.stringify(littleEntry.date) === dayAfter )));
        
      }else{
        
        //console.log("Am tag danach keine Blutung, bis jetzt folgende Länge: " +counter);

      
        let twoDaysAfter = calculateDayAfter(dayAfter);
        if(entryArray.find((littleEntry) =>  (JSON.stringify(littleEntry.date) === twoDaysAfter ) && (((littleEntry.blood) === "1"  )||((littleEntry.blood) === "2"  )||((littleEntry.blood) === "3"  )) )){
          counter+=2;
          //console.log("Zwei Tage später wurde aber was eingetragen, also am "+ twoDaysAfter+"Länge beträgt jetzt: "+counter);
         lengthofMens(entryArray.find((littleEntry) =>  (JSON.stringify(littleEntry.date) === twoDaysAfter )));
        }else{
          
        //Zwischenblutungen sollen nicht eingetragen werden
        if(counter>1){
          console.log("Die Länge wird gespeichert:"+counter);
          mensLengthsArray.push(counter);}
          counter=1;
        }
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
  firstMensDaysArray=[];
  mensLengthsArray=[];
  console.log("-------------------------------------------\n");
};



//--------------------------Warum werden die firstMensDays mit jedem speichern in dem Array verdoppelt?
//--------------------------Als nächstes: den tag pause auch bei der calcMensLength berücksichtigen 
//--------------------------Noch verbessern: auch einen tag pause lassen können bei checkIfFirstday
//Cycluslänge berechnen
//
//In DB kloppen dat Ding
//Am ende noch einmal aufrufen, da es immer ein "speichern" hinterherhinkt