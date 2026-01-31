import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Product } from './data/vo/Product';
import { MenuProvider } from './data/Context/MenuContext';
import { LoginProvider } from './data/Context/LoginContext';

//redux
import { Provider } from 'react-redux';
import { store } from './presentation/store/redux/store';

import NavigationStackView from './presentation/navigtion/NavigationStackView';



export type RootStackParamList = {
    Main : undefined;
    Product: {product? : Product};
    Home : undefined;
    Sub : undefined;
    Setting: undefined;
};

export default function App() {
  return (
    <Provider store={store}>
      <LoginProvider>
      <MenuProvider>
      <SafeAreaProvider>
        <NavigationStackView/>
      </SafeAreaProvider>
    </MenuProvider>
    </LoginProvider>  
    </Provider>
  );
}
      

