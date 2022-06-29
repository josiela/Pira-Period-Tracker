/**
 * Cycle Calc. Returns dates in format DD/MM/YY
 *
 * @param {*} props
 * @returns
 */

const CycleCalc = (props) => {
  const long = [1, 3, 5, 7, 8, 10, 12];
  const short = [4, 6, 9, 11];
  const special = [2];

  const monthLong = 31;
  const monthShort = 30;
  const monthSpecial = 29;
  const monthNotSpecial = 28;

  let nextYear = false;
  let k;
  let cycle;

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

    //calculates the date of the next cycle, saves it in Array k
    const nextDayCalc = (day, month, year) => {
      let y = NaN;
      let x = NaN;
      cycle = setCycle();
  
      if (long.includes(month)) {
        y = parseInt((day + cycle) / monthLong);
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
  
      if (y != NaN) {
        switch (y) {
          case 0:
            y = month;
            k = [x, y, year];
            break;
          case 1:
            month += 1;
            k = [x, checkYear(month, year)];
            break;
          case 2:
            month += 2;
            k = [x, checkYear(month, year)];
            break;
          case 3:
            month += 3;
            k = [x, checkYear(month, year)];
            break;
          case y == 4:
            month += 4;
            k = [x, checkYear(month, year)];
            break;
          case y == 5:
            month += 5;
            k = [x, checkYear(month, year)];
            break;
          default:
            console.log("You Failed me");
        }
      }
  
      console.log("First day of next cycle " + k);
      endOfMensCalc(k);
    };

  //called after nextDayCalc passed the date and saves the date in k
  const endOfMensCalc = (date) => {
    let y = NaN;
    let x = NaN;
    let day = date[0];
    let month = date[1][0];
    let year = date[1][1];
    
    mens = setMens();
    if (long.includes(month)) {
      y = parseInt((day + mens) / monthLong);
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
        x = (day + mens) % monthNotSpecial;
        if (x == 0 && y != 0) {
          x = monthNotSpecial;
          y = 0;
        }
      }
    }

    if (y != NaN) {
      switch (y) {
        case 0:
          y = month;
          k = [x, y, year];
          break;
        case 1:
          month += 1;
          k = [x, checkYear(month, year)];
          break;
        case 2:
          month += 2;
          k = [x, checkYear(month, year)];
          break;
        case 3:
          month += 3;
          k = [x, checkYear(month, year)];
          break;
        case y == 4:
          month += 4;
          k = [x, checkYear(month, year)];
          break;
        case y == 5:
          month += 5;
          k = [x, checkYear(month, year)];
          break;
    
      }
    }
    console.log("lastday of mens " + k);
  };


//calls nextDayCalc function with current date 
  nextDayCalc(30, 12, 2021);


  return 3;
};

export default CycleCalc;
