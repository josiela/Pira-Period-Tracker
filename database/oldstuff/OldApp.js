import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entry from './EntryClass';
import { storeMyStuff, getMyStuff} from './StorageStuff';


export default function App() {

  let firstEntry= new Entry(1,2 ,3,4,"Nichts Sonderliches", 5);
  let secondEntry= new Entry(11, 12,13,14,"Doch etwas Sonderliches", 15);
  let dummyEntry= new Entry(21, 22,23,24,"nix", 25);

  //Code 17.11
  let anEntry= new Entry(31, 32,1,1," warum auch nicht", 1);
  
  let entryArray=[firstEntry, secondEntry]; 
  const [anzuzeigenderEntry, setanzuzeigendenEntry]=useState(0);

  const [var2, setVar2]=useState([firstEntry,secondEntry, dummyEntry]);
  const [bleeding, setBleeding]=useState(0);
  const [pain, setPain]=useState(0);
  const [mood, setmood]=useState(0);
  const [day, setday]=useState(0);
  const [note, setnote]=useState("");
  const [date, setdate]=useState(19);


  //const [secondEntryArray, setsecondArray] = useState([firstEntry, secondEntry]); 


  //Eintrag im aktiven Array verändern
  //entryArray.find(entry => entry.date===21).bleeding=0;
  
  //Eintrag im aktiven Array hinzufügen
  //let thirdEntry= new Entry(23, 3,4,5,"Noch Doch etwas Sonderliches", 3);
  //entryArray.push(thirdEntry);

  //Eintrag im aktiven Array löschen (second Entry wird gelöscht)
  //entryArray= entryArray.filter(entry=> entry.date !==22);


  //Überhaupt zeugs speichern und abrufen
  //const string1= 8;
  //storeMyStuff('firstKey', string1);
  //const [var1, setVar1]=useState(0);



//  getMyStuff('firstKey').then((returnedValue)=>{
  //    setVar1(JSON.parse(returnedValue));
    //})
 
  const getArray= async()=>{
      getMyStuff('ArrayKey').then((returnedValue)=>{
        setVar2(JSON.parse(returnedValue));
      })
      
    }


    //Neuen Eintrag erzeugen
    const newEntry =async(date,pain)=>{
      let mynewEntry = new Entry(date, pain,mood,bleeding,note, day);
      var2.push(mynewEntry)
      storeMyStuff('ArrayKey',var2);
    }
  
  

  return (
    <View style={styles.container}>
    
      
     
      <Text style={styles.bigtext}>Hello, die App funktioniert und die Var ist:{var2[anzuzeigenderEntry].pain}  </Text>
      <TouchableOpacity style={styles.button} onPress={()=>getArray()
            }><Text style={styles.buttontext}>Refresh</Text></TouchableOpacity>
      <StatusBar style="auto" />


          {/*Schmerz speichern */}
      <TextInput style={styles.textInput}
          placeHolder="Bitte gib schmerzen an"
            value={pain}
            onChangeText={(data) => setPain(JSON.parse(data))}
            underlineColorAndroid='transparent'
        />
        <TouchableOpacity style={styles.button} onPress={()=>newEntry(date, pain)}>
             <Text style={styles.buttontext}>Schmerz Speichern</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.button} onPress={()=>setanzuzeigendenEntry(anzuzeigenderEntry+1)
            }><Text style={styles.buttontext}>zeig mir neuen Eintrag</Text></TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigtext:{
    fontSize:23,
    fontWeight: 'bold',
  }, 
  buttontext:{
    fontSize:18,
    fontWeight: 'bold',
    color:'#fff',
  },
  button:{
    backgroundColor: 'tomato',
    height:40,
    width: 100,
    justifyContent:'center',
    alignItems:'center',
    margin:50,
  },
  textInput:{
    textAlign: 'center',
    height:40,
    width:'100%',
    borderWidth:1,
    borderColor:'blue',
    
    
  }
});
