import { createDrawerNavigator } from 'react-navigation-drawer';
import SwipeNavigation from "../SwipeNavigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import StackNavigation from './StackNavigation';
import SettingsScreen from '../../screens/SettingsScreen';
import SettingStack from './SettingStack';

const Drawer = createDrawerNavigator();

const DrawNavigation = ()=> {
    return(
        <Drawer.Navigator>
            <Drawer.Screen name = "Home" component={StackNavigation}/>
            <Drawer.Screen name = "Settings" component = {SettingsScreen}/>
        
        </Drawer.Navigator>
    )
}
