import React from "react";
import {
    View, 
    Text, 
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

import { SafeAreaView } from "react-native-safe-area-context";

import MainScreen from "../screen/MainScreen";
import ItemListScreen from "../screen/ItemListScreen";
import SettingScreen from "../screen/SettingScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                headerShown: false,
                tabBarIcon:({focused, color, size}) =>{
                    let iconName: string = 'home';
                    if(route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    }else if(route.name === 'ItemList') {
                        iconName = focused ? 'list' : 'list-outline';
                    }else if(route.name === 'Setting') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }
                return <Ionicons name={iconName as any} size={size} color={color} />;
             },
             tabBarActiveTintColor: '#007AFF',
             tabBarInactiveTintColor: 'gray',
             tabBarStyle: {
                paddingBottom: 5,
                paddingTop: 5,
                height: 100,
             },
             tabBarHideOnKeyboard: true,
             tabBarSafeAreaInsets: { bottom: 0 },
             safeAreaInsets: { bottom: 0 },
            
        })}
        >
         <Tab.Screen 
            name = "Home"
            component={MainScreen}
            options={{title:'Home'}}
          />
           <Tab.Screen 
            name = "ItemList"
            component={ItemListScreen}
            options={{title:'item list'}}
          />
           <Tab.Screen 
            name = "Setting"
            component={SettingScreen}
            options={{title:'Setting'}}
          />
        </Tab.Navigator>
    
    );
}