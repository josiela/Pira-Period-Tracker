import React, { useEffect , useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
  Pressable,
  Text,
  TextInput
  
} from "react-native";
import { normalize, normalizeH } from "../constants/fontResponsive";
import Entry from "../database/EntryClass";
import Input from "../components/Input";
import colors from "../constants/colors";
import {storeMyStringStuff, getMyStringStuff, getMyObjectStuff, removeMyStuff,getAllKeys, storeMyStuff} from "../database/CreateDatabase";
/**
 * Probleme in diesem File: Textfeld funktioniert nicht / kommt keine Tastatur- aber nur bei meinem Handy nicht, sigh
 * ausgewähltes anzeigen??
 * 
 * 
 * 
 * 
 * The Screen we forgot about.
 * Login PW Screen
 *
 * takes the Image Source of our Logo and asks the password
 *
 * ToDo: Navigation and create a Logo. The Image is a dummy rn.
 * Also takes in the Password, so it's safe to unlock :)
 * needs to add logic: Like failed PW
 *
 * @param {*} props
 * @returns
 */


 const UselessTextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={40}
    />
  );
}
let opacityFace=0.2;


const EntryScreen = (props) => {
  let firstEntry= new Entry(1,2 ,3,4,"Nichts Sonderliches");
  let [entryArray, setEntryArray]=useState([firstEntry])
  let [proveArray, setproveArray]=useState([firstEntry])
  let [anzuzeigenderEntry, setanzuzeigendenEntry]=useState(1);
  
  
  const [blood, setBlood] = useState("");
  const [pain, setPain] = useState("");
  const [mood, setMood] = useState("");
  const [date, setDate]=useState(2000.01);
  const [notes, setNotes] = useState("Nix besonderes, bisschen Wärmekissen dies das");


  const createNewEntry= async() => {

    //Wenn es schon nen Eintrag gibt, den erst löschen
     if(entryArray.find(entry => entry.date===date)){
       console.log("Bereits ein Eintrag vorhanden")
        entryArray= entryArray.filter(entry=> entry.date !==date);
     }
    let newEntry = new Entry(date, pain, mood, blood, notes);
    setDate(date+1);                                            //--- eigentlich nicht richtug, gibt ja nur noch kein Date
    entryArray.push(newEntry);                  //                  Push funktioniert nicht
    setanzuzeigendenEntry(anzuzeigenderEntry+1);

    console.log(anzuzeigenderEntry + " "+entryArray[anzuzeigenderEntry].date);
     removeMyStuff('@entryArrayKey');
    storeMyStuff('@entryArrayKey',entryArray); 
   
  };



  //Old stuff--------------------------------------------------------------------------------
  const [databaseNumber, setDatabaseNumber] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [value, onChangeText] = React.useState('Useless Multiline Placeholder');

  //validates Numbers only
  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  //resets the Input in case nothing of worth was given
  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  //confirms that a number was entered, else it throws an insult
  const confirmInputHandler = async() => {
    const chosenPin = parseInt(enteredValue);
    if (isNaN(chosenPin)) {
      Alert.alert("Das Passwort muss mindestens eine Ziffer enthalten");
      resetInputHandler;
      

    }else{
      setConfirmed(true);
      setSelectedNumber(chosenPin);
      storeMyStringStuff('@password',JSON.stringify(chosenPin));
      setEnteredValue("");
      Keyboard.dismiss(); 
    }
  };

  //Shit to prove the database works
  const getPWfromDBHandler = async() => {
    await getMyStringStuff('@password').then((value)=>{
      console.log("first"+value);
      setDatabaseNumber(value);
    });
    
   
  };

  const handleFaceButtons = (number, obj)=> {
    setMood(number);
    opacityFace=0.8;
    console.log(opacityFace);
   
  };
  
  //if pressed and confirmed selectedNumber holds the PIN
  if (confirmed) {
    console.log(selectedNumber + ".. here ye go");
  }

  const getArray= async()=>{
    await getMyStringStuff('@entryArrayKey').then((returnedValue)=>{
      setEntryArray(JSON.parse(returnedValue));
    })
    
  }
  useEffect(() => {
    getArray();
  });
// Old stuff ends------------------------------------------------------------------------------------------
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <View style={styles.container3}>
          <Image style={styles.logo} source={require("../assets/plus.png")} />
          <Text style={styles.text}>{"Datum "}</Text>
        </View>

  <View style={styles.container2}>
        <View style={styles.bigTextContainer}>
        <Text style={styles.bigText}>{"Blutung : "}</Text>
          <Text style={styles.bigText}>{"Schmerz : "}</Text>
          <Text style={styles.bigText}>{"Stimmung :  "}</Text>
        
          
          
        </View>
        <View style={styles.IconRowContainer}>
            <View style={styles.inputRow}>
            
              <Pressable style={styles.iconBox} onPress={()=>setBlood("1") }>
                  <Image style={styles.icon} source={require("../assets/Blu1.png")} />
              </Pressable>
              <Pressable style={styles.iconBox} onPress={()=>setBlood("2")}>
                  <Image style={styles.blod2} source={require("../assets/Blut2.png")} />
              </Pressable>
              <Pressable style={styles.iconBox} onPress={()=>setBlood("3")}>
                  <Image style={styles.blod3} source={require("../assets/Blut3.png")} />
              </Pressable>
              
            </View>

            
            <View style={styles.inputRow}>
            <Pressable style={styles.iconBox} onPress={()=>setPain("1")}>
                  <Image style={styles.clouds} source={require("../assets/Schmerz1.png")} />
              </Pressable>
              <Pressable style={styles.iconBox} onPress={()=>setPain("2")}>
                  <Image style={styles.clouds} source={require("../assets/Schmerz2.png")} />
              </Pressable>
              <Pressable style={styles.iconBox} onPress={()=> setPain("3")}>
                  <Image style={styles.clouds} source={require("../assets/Schmerz3.png")} />
              </Pressable>
            </View>

            <View style={styles.inputRow}>
             
              <Pressable style={styles.iconBox} onPress={()=>setMood("1")}>
                  <Image style={styles.faces} source={require("../assets/Stimmung1.png")} />
              </Pressable>
              <Pressable style={styles.iconBox} onPress={()=>setMood("2")}>
                  <Image style={styles.faces} source={require("../assets/Stimmung2.png")} />
              </Pressable>
              <Pressable style={styles.iconBox} onPress={()=>setMood("3")}>
                  <Image style={styles.faces} onPress={()=>this.opacity=0.2} source={require("../assets/stimmung3.png")} />
              </Pressable>
            </View>
            <View style={styles.button}>
          <Pressable
            style={styles.button1}
            onPress={() => createNewEntry()}
           
          >
          <Text style={styles.textButton}>{"speichern"}</Text>
          </Pressable>
        </View>
            </View>
        

          
        </View>
        <View style={styles.bigDownContainer}>
        <Text style={styles.bigText2}>{"Notes"}</Text>
        <View style={styles.notesContainer}>
          <TextInput
                style={styles.textInputStyle}
                //onChangeText={onChangeNumber}
                //value={number}
                placeholder="Tippe hier"
                placeholderTextColor={colors.accBlue}
              />
  
      <UselessTextInput
        multiline
        numberOfLines={7}
        onChangeText={text => onChangeText(text)}
        value={value}
        style={{padding: 5}}
      />
      
        </View>

        <View style={styles.button}>
          <Pressable
            style={styles.button1}
            onPress={() => Alert.alert("bestätigt")}
           
          >
          <Text style={styles.textButton}>{"speichern"}</Text>
          </Pressable>
        </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "50%",
    marginTop: "10%",
  },
  container2: {
    flexDirection: 'row',
    height: "80%",
  },
  container3: {

    flexDirection: 'row',
    height: "10%",
    width: "100%",
   
  },
  bigDownContainer:{
    
    alignSelf:"center",
    height: "80%",
    width:"90%",
  },
  notesContainer:{
    
      width: "100%",
      alignSelf: "center",
      height: normalizeH(60),
      borderBottomWidth: 1,
      borderLeftWidth:1,
      borderRightWidth:1,
      borderTopWidth:1,
      borderColor: colors.accBlue,
  },
  IconRowContainer: {
    marginTop:normalizeH(15),
    height: normalize(250),
    width: "80%",
    marginLeft:"0%",
  },
  bigTextContainer:{
    
    backgroundColor: colors.mainLG,
    flexDirection: 'column',
    width:"35%",
    height:"90%",
    marginTop:"13%",
    marginLeft:"5%",
  },
 
  iconBox:{
    width:"30%",
    marginRight: "10%",
    height:normalize(50),
    backgroundColor: colors.mainLG, 

  },
  logo: {
    marginLeft:"4%",
    width: normalize(54.5),
    height: normalize(52),
  },
  inputRow:{
    flexDirection: 'row',
    width:"60%",
    height:"20%",
    marginTop:"10%",
    marginRight:"7%",
  },
  inputBox: {},
  //Button Styles
  buttonBox: {
    margin: normalize(50),
    elevation:normalize( 5),
  },

  textButton: {
    color: colors.mainLG,
    fontSize: normalize(16),
    lineHeight: normalize(21),
    letterSpacing: 0.25,
  },

  bigText: {
    marginTop:normalizeH(10),
    marginBottom:normalizeH(15),
    color: colors.accBlue,
    fontSize: normalize(20),
    lineHeight: normalize(30),
    letterSpacing: 0.25,
  },
  bigText2: {
    marginTop:"10%",
    color: colors.accBlue,
    fontSize: normalize(20),
    lineHeight: normalize(30),
    letterSpacing: 0.25,
  },
  text: {
    alignSelf:"center",
    marginLeft:"40%",
    color: colors.accBlue,
    fontSize: normalize(30),
    lineHeight: normalize(30),
    letterSpacing: 0.25,
  },
  icon:{
    height: normalize(45),
    width: normalize(25),
    alignSelf: "center",
    marginLeft: "10%",
    
  },
  blod2:{
    height: normalize(53),
    width: normalize(38),
    marginLeft: "10%",
  },
  blod3:{
    height: normalize(53),
    width: normalize(36),
  },
  faces:{
    
    height: normalize(50),
    width: normalize(48),
  },
  clouds:{
    marginTop: normalize(10),
    height: normalize(43),
    width: normalize(50),
  },
  TextInput:{
    height: normalizeH(10),
    margin: normalize(12),
    borderWidth: normalize(20),
    padding:normalize(10),
  },
  
  button1: {
    borderRadius: 8, 
    marginLeft:"64%",
    marginTop:"10%",
    height: normalize(40),
    width: normalize(100),
    elevation: 3,
    backgroundColor: colors.accBlue,
    alignItems: "center",
   
    justifyContent: "center",
  },
});

export default EntryScreen;
