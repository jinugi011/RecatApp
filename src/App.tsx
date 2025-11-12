import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './presentation/screen/HomeScreen';
import MainScreen from './presentation/screen/MainScreen';
import ProductScreen from './presentation/screen/ProductScreen';
import ItemListScreen from './presentation/screen/ItemListScreen';
import SettingScreen from './presentation/screen/SettingScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Product } from './data/vo/Product';
import { MenuProvider } from './data/Context/MenuContext';
import { navigationRef } from './presentation/navigtion/NavigationService';

//redux
import { Provider } from 'react-redux';
import { store } from './redux/store';



//네이게이션 스택 (뷰관리 )
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export type RootStackParamList = {
    Main : undefined;
    Product: {product? : Product};
    Home : undefined;
    Sub : undefined;
};

export default function App() {
  return (
    <Provider store={store}>
    <SafeAreaProvider>
      <MenuProvider>
      <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName='Main' screenOptions={{ headerShown:false }}>
            <Stack.Screen name="Main" component={MainScreen}/>
            <Stack.Screen name="Product" component={ProductScreen }/>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Sub" component={ItemListScreen }/>
            <Stack.Screen name="Setting" component={SettingScreen }/>
          </Stack.Navigator>
      </NavigationContainer>
      </MenuProvider>
    </SafeAreaProvider>
    </Provider>
  );
}
      

