import React from 'react';
import { StyleSheet, Text, View } from 'react-native'; // 💡 SafeAreaViewBase는 불필요하여 제거
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './presentation/screen/HomeScreen';
import MainScreen from './presentation/screen/MainScreen';
import ProductScreen from './presentation/screen/ProductScreen';
import SubScreen from './presentation/screen/SubScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Product } from './data/vo/Product';

//네이게이션 스택 (뷰관리 )
const Stack = createNativeStackNavigator();


export type RootStackParamList = {
    Main : undefined;
    Product: {product? : Product};
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Main' screenOptions={{ headerShown:false }}>
        <Stack.Screen name="Main" component={MainScreen}/>
        <Stack.Screen name="Product" component={ProductScreen }/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider> 
  );
}
  
