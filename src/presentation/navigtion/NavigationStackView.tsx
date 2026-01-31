import React from "react";
import { Text,Button, View } from "react-native";
import MainScreen from "../screen/MainScreen";
//import { Navigaimport HomeScreen} from '../screen/HomeScreen';
import HomeScreen from "../screen/HomeScreen";
import ProductScreen from '../screen/ProductScreen';
import ItemListScreen from '../screen/ItemListScreen';
import SettingScreen from '../screen/SettingScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from '../navigtion/BottomTabBar';
import { navigationRef } from '../navigtion/NavigationService';
import { NavigationContainer } from '@react-navigation/native';

//네이게이션 스택 (뷰관리 )
const Stack = createNativeStackNavigator();

export default function NavigationStackView() {


    return(
       <NavigationContainer ref={navigationRef}>
           <Stack.Navigator initialRouteName='MainTabs' screenOptions={{ headerShown:false }}>
            <Stack.Screen name="Main" component={MainScreen}/>
            <Stack.Screen name="Product" component={ProductScreen} />
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Sub" component={ItemListScreen }/>
            <Stack.Screen name="Setting" component={SettingScreen }/>
            <Stack.Screen name="MainTabs" component={BottomTabNavigator} />

          </Stack.Navigator> 
       </NavigationContainer>  
    )
}