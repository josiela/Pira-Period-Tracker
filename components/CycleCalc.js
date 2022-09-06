import {
  getMyStringStuff,
  removeMyStuff,
  storeMyStringStuff,
  storeMyStuff,
} from "../database/CreateDatabase";
import {  useState } from "react";
/**
 * Cycle Calc. Returns dates in format DD/MM/YY
 *
 * @param {*} props
 * @returns
 */

 

const CycleCalc = async () => {
  let day=2;
  let year =2022;
  let month=2;
  console.log("Yey CycleCalc wird aufgerufen");
  //let [entryArray, setEntryArray] = useState([]);
  let mensLength=5;
  let cyclusLength=28;
  const long = [1, 3, 5, 7, 8, 10, 12];
  const short = [4, 6, 9, 11];
  const special = [2];
  

  const monthLong = 31;
  const monthShort = 30;
  const monthSpecial = 29;
  const monthNotSpecial = 28;

  let cycle;

  //----------------------------------DB SECTION----------------------
  // Gets the Array of Entrys from DB
  await getMyStringStuff("@entryArrayKey").then((returnedValue) => {
    if (returnedValue !== null) {
     // setEntryArray(JSON.parse(returnedValue));
    } else {
     // setEntryArray([]);
    }
  });

  
    await getMyStringStuff("@mensLength").then((returnedValue) => {
      console.log("Old Length: " + JSON.parse(returnedValue));
      if (returnedValue !== null) {
        mensLength=JSON.parse(returnedValue);
      } else {
        mensLength=5;
      }
    });

    await getMyStringStuff("@cyclusLength").then((returnedValue) => {
      console.log("Old Length: " + JSON.parse(returnedValue));
      if (returnedValue !== null) {
        cyclusLength=JSON.parse(returnedValue);
      } else {
        cyclusLength=28;
      }
    });

  


  //---------------------------------------------------------------------
  //checks for LeapYear is given the year
  const isLeapYear = (year) => {
    if (year % 4 == 0) {
      return true;
    } else {
      return false;
    }
  };

  //checks for the CycleAverage is given all the itemsStored in Database as int, returns value, get's eventually called from setCycle()
  const checkCycleAverage = (itemsStored) => {
    const x =
      itemsStored.reduce((partialSum, a) => partialSum + a, 0) /
      itemsStored.length;
    //k = x / c;

    return Math.round(x);
  };

  //checks for the MensAverage is given all the itemsStored in Database as int, returns value, get's called from setMens()
  const checkMensAverage = (itemsStored) => {
    const x =
      itemsStored.reduce((partialSum, a) => partialSum + a, 0) /
      itemsStored.length;
    return Math.round(x);
  };

  //checks if there are enough entries in Database for own average, returns true or false. Get's called from setCycle()/setMens()
  const checkifAverage = (mensItems, cycleItems) => {
    const lenMen = mensItems.length;
    const lenCycle = cycleItems.length;
    if (lenMen && lenCycle < 5) {
      return false;
    } else {
      return true;
    }
  };

  //checks if the next cycle hit's next year
  const checkYear = (month, year) => {
    if (month >= 12) {
      year += 1;
      month = month % 12;
      nextYear = true;
    }
    return [month, year];
  };

  //sets Cycle Value given the Array of Data from Database, returns a value
  const setCycle = () => {
    const mensItems = [4, 5, 7];
    const cycleItems = [22, 26, 28];
    if (checkifAverage(mensItems, cycleItems) == true) {
      cycle = checkCycleAverage(cycleItems);
      console.log("individual", cycle);
      return cycle;
    } else {
      cycle = 28;
      return cycle;
    }
  };

  //sets Mens Value given the Array of Data from Database, returns a value
  const setMens = () => {
    const mensItems = [4, 5, 7];
    const cycleItems = [22, 26, 28];
    if (checkifAverage(mensItems, cycleItems) == true) {
      mens = checkMensAverage(mensItems);
      console.log("individual", mens);
      return mens;
    } else {
      mens = 5;
      return mens;
    }
  };

  //calculates the date of the next cycle, saves it in Array firstDay
  const nextDayCalc = (day, month, year) => {
    let y = NaN;
    let x = NaN;
    let firstDay;
    cycle = setCycle();
    console.log("cycle before iffff " + cycle);

    if (long.includes(month)) {
      y = parseInt((day + cycle) / monthLong);
      console.log(" ich bin eine " + y);
      x = (day + cycle) % monthLong;

      if (x == 0 && y != 0) {
        x = monthLong;
        y = 0;
      }
    } else if (short.includes(month)) {
      y = parseInt((day + cycle) / monthShort);
      x = (day + cycle) % monthShort;
      if (x == 0 && y != 0) {
        x = monthShort;
        y = 0;
      }
    } else if (special.includes(month)) {
      if (isLeapYear(year) == true) {
        y = parseInt((day + cycle) / monthSpecial);
        x = (day + cycle) % monthSpecial;
        if (x == 0 && y != 0) {
          x = monthSpecial;
          y = 0;
        }
      } else {
        y = parseInt((day + cycle) / monthNotSpecial);
        x = (day + cycle) % monthNotSpecial;
        if (x == 0 && y != 0) {
          x = monthNotSpecial;
          y = 0;
        }
      }
    }
      console.log("Y ist : "+y);
      if (y != NaN) {
        switch (y) {
          case 0:
            y = month;
            k = [x, [y, year]];
            console.log("Hier ist k: "+k);
            break;
          case 1:
            month += 1;
            k = [x, checkYear(month, year)];
            console.log("Hier ist k: "+k);
            break;
          case 2:
            month += 2;
            k = [x, checkYear(month, year)];
            console.log("Hier ist k: "+k);
            break;
          case 3:
            month += 3;
            k = [x, checkYear(month, year)];
            console.log("Hier ist k: "+k);
            break;
          case y == 4:
            month += 4;
            k = [x, checkYear(month, year)];
            console.log("Hier ist k: "+k);
            break;
          case y == 5:
            month += 5;
            k = [x, checkYear(month, year)];
            console.log("Hier ist k: "+k);
            break;
          default:
            console.log("You Failed me");
        }
    }
    
    console.log("TEEEEXT "+ endOfMensCalc(k));
    return k;
  };

  //called after nextDayCalc passed the date and saves the date in lastDay
  const endOfMensCalc = (date) => {
    console.log("EndofMensCalc wird aufgerufen "+date[0]);
    let y = NaN;
    let x = NaN;
    let lastDay;
    let day = date[0];
    console.log("EndofMensCalc wird weitergeführt");
    let month = date[1][0];
    let year = date[1][1];
    console.log(
      "Tag " + day + " monnat " + month + " year " + year + " DATE:   " + date
    );

    mens = setMens();
    if (long.includes(month)) {
      y = parseInt((day + mens) / monthLong);
      console.log(y + " hdashdhakjs");
      x = (day + mens) % monthLong;
      if (x == 0 && y != 0) {
        x = monthLong;
        y = 0;
      }
    } else if (short.includes(month)) {
      y = parseInt((day + mens) / monthShort);
      x = (day + mens) % monthShort;
      if (x == 0 && y != 0) {
        x = monthShort;
        y = 0;
      }
    } else if (special.includes(month)) {
      if (isLeapYear(year) == true) {
        y = parseInt((day + mens) / monthSpecial);
        x = (day + mens) % monthSpecial;
        if (x == 0 && y != 0) {
          x = monthSpecial;
          y = 0;
        }
      } else {
        y = parseInt((day + mens) / monthNotSpecial);
        console.log("pick me!" + y);
        x = (day + mens) % monthNotSpecial;
        if (x == 0 && y != 0) {
          x = monthNotSpecial;
          y = 0;
        }
      }
    }
    console.log("what is y? " + y);

    if (y != NaN) {
      switch (y) {
        case 0:
          y = month;
          lastDay = [x, [y, year]];
          break;
        case 1:
          month += 1;
          lastDay = [x, checkYear(month, year)];
          break;
        case 2:
          month += 2;
          lastDay = [x, checkYear(month, year)];
          break;
        case 3:
          month += 3;
          lastDay = [x, checkYear(month, year)];
          break;
        case 4:
          month += 4;
          lastDay = [x, checkYear(month, year)];
          break;
        case 5:
          month += 5;
          lastDay = [x, checkYear(month, year)];
          break;
        default:
          console.log("You Failed twice");
      }
    }
    return lastDay;
  };

  //calls nextDayCalc function with current date
  //nextDayCalc(30, 12, 2021);
  let firstDay = nextDayCalc(day, month, year);
  //console.log("Rangebastelter Text"+firstDay[0]);
  let lastDay = endOfMensCalc(firstDay);
  //console.log("First Day " + firstDay + " lastday " + lastDay);
  
  let firstDayString = firstDay[1][1] + "-"+firstDay[1][0]+"-"+firstDay[0];
  console.log(firstDayString+" ist das Datum, und der Datentyp: "+ typeof(firstDayString));
  storeMyStringStuff("@firstDayArrayKey", firstDayString);
  let lastDayString = lastDay[1][1] + "-"+lastDay[1][0]+"-"+lastDay[0];
  console.log(lastDayString+" ist das Datum, und der Datentyp: "+ typeof(lastDayString));
  storeMyStringStuff("@lastDayArrayKey", lastDayString);
  
  return firstDay, lastDay;
  //Diese beiden Variablen müssen in die Datenbank und im Index-Calc aufgerufen werden. 
  
};

export default CycleCalc;
//Ich brauche: Abstand von erstem zu letztem mens tag
//Abstand von erstem zu erstem oder letztem zu nächstem ersten (Also zykluslänge)
//-> Das in Arrays packen
//-> Help?