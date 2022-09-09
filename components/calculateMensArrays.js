
import { storeMyStuff,removeMyStuff, getMyStringStuff } from "../database/CreateDatabase";

import Entry from "../database/EntryClass";

let firstEntry = new Entry("2027-08-01", 2, 3, 4, "Nichts Sonderliches");
let entryArray=[];
let firstMensDaysArray=[];
let mensLengthsArray=[];
let cyclusLengthsArray=[];
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
//Wenn man am ende angekommen ist-> schrittweite, die man gegangen ist= Menslänge für das mal 

const calculateDayBefore=(date)=>{
  
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
   
  }
  else if(dayNumber==1 && monthNumber ==1){
    dayBefore=JSON.stringify((yearNumber-1)+"-"+12+"-"+31);
  
  }
  else if(dayNumber==1 && monthNumber ==3){
    if(yearNumber%4==0){
      dayBefore=JSON.stringify(yearNumber+"-"+fixDate(2)+"-"+29);
    
    }
    else{
      dayBefore=JSON.stringify(yearNumber+"-"+fixDate(2)+"-"+28);
      
    }
  }
  else if(dayNumber==1 && (monthNumber ==2 ||monthNumber ==4 ||monthNumber ==6||monthNumber ==8||monthNumber ==9||monthNumber ==11)){
    dayBefore=JSON.stringify(yearNumber+"-"+fixDate(monthNumber-1)+"-"+31);
  
  }
  else if(dayNumber==1 && (monthNumber ==3 ||monthNumber ==5 ||monthNumber ==7||monthNumber ==10||monthNumber ==12)){
    dayBefore=JSON.stringify(yearNumber+"-"+fixDate(monthNumber-1)+"-"+30);
 
  }

  return dayBefore;
};


//Prüft, ob der Tag der erste der blutung in diesem zyklus war, und packt ihn in das firstMensDaysArray, wenn ja
const checkIfFirstDay=(entry)=>{
  //console.log(entry.blood);
  if(entry.blood!=="" && entry.date!== 1){

  
  let dayBefore= calculateDayBefore(JSON.stringify(entry.date));
  //Prüfe, ob Tag davor in der DB ist
  if(entryArray.find((littleEntry) =>  (JSON.stringify(littleEntry.date) === dayBefore ) && (((littleEntry.blood) === "1"  )||((littleEntry.blood) === "2"  )||((littleEntry.blood) === "3"  )) )){
        oneDayBreakCounter=0;
       
        
      }else{
        //Wenn nicht, prüfen ob zwei tage vorher was mit Blutung in der DB ist
   
          
          let twoDaysBefore = calculateDayBefore(dayBefore);
  
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
   
  }
  if(dayNumber==31 && monthNumber<=11){
    dayAfter=JSON.stringify(yearNumber+"-"+fixDate(monthNumber+1)+"-"+fixDate(1));
    
  }
  else if(dayNumber==30 && ((monthNumber ==4)||(monthNumber ==6)||(monthNumber ==9)||(monthNumber ==11))){
    dayAfter=JSON.stringify(yearNumber+"-"+fixDate(monthNumber+1)+"-"+fixDate(1));
    
  }
  else if(dayNumber==31 && ((monthNumber ==1)||(monthNumber ==3)||(monthNumber ==5)||(monthNumber ==7)||(monthNumber ==8)||(monthNumber ==10))){
    dayAfter=JSON.stringify(yearNumber+"-"+fixDate(monthNumber+1)+"-"+fixDate(1));
 
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
  
  
  return dayAfter;
};


const lengthofMens=(entry)=>{
  

  let dayAfter=calculateDayAfter(JSON.stringify(entry.date));


  //Prüfe, ob Tag danach in der DB ist
   if(entryArray.find((littleEntry) =>  (JSON.stringify(littleEntry.date) === dayAfter ) && (((littleEntry.blood) === "1"  )||((littleEntry.blood) === "2"  )||((littleEntry.blood) === "3"  )) )){
    
        counter+=1;
        lengthofMens(entryArray.find((littleEntry) =>  (JSON.stringify(littleEntry.date) === dayAfter )));
        
      }else{
        

      
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


//Berechnet Zykluslänge

const calculateCyclusLengths=(entry)=>{

//Firstdays Eintrag nehmen, nächsten tag berechnen, schauen ob in "firstdays" drin, zählen wie oft das gemacht wird?

let counter=2;
let finished=false;
let date= JSON.stringify(entry.date);
//Nächsten tag berechnen

while((counter<100) && finished===false){
  
  let dayAfter=calculateDayAfter(date);
  date=dayAfter;

  //Schauen ob nächster tag ein erster Tag ist
  if(firstMensDaysArray.find((littleEntry) =>  (JSON.stringify(littleEntry.date) === dayAfter )  )){
      cyclusLengthsArray.push(counter);
      counter=2;
      finished=true;
  }else{
    counter+=1;
}}

}


const storeEverything = async () => {
    console.log("Folgendes wird in die DB gelegt:\n Menslängen:" );
    mensLengthsArray.forEach(justPrintTheArray);
    console.log("Zykluslängen:");
    cyclusLengthsArray.forEach(justPrintTheArray); 
    

    removeMyStuff("@mensLengthArrayKey", mensLengthsArray);
    removeMyStuff("@cyclusLengthArrayKey", cyclusLengthsArray);

    storeMyStuff("@mensLengthArrayKey", mensLengthsArray);
    storeMyStuff("@cyclusLengthArrayKey", cyclusLengthsArray);

};

export const startCalculatingMensLengths = async() => {
  
  console.log("startCalculatingMensLengths aufgerufen");
  await getArray();

  entryArray.forEach(checkIfFirstDay);
  firstMensDaysArray.forEach(lengthofMens);

  firstMensDaysArray.forEach(printEntryArray);
  if(firstMensDaysArray.length>1){
    firstMensDaysArray.forEach(calculateCyclusLengths);
  }
  

    storeEverything();
    console.log("Gespeichert");
    doItTwice=true;  
    cyclusLengthsArray=[];
    firstMensDaysArray=[];
    mensLengthsArray=[];
  



  console.log("-------------------------------------------\n");
};

