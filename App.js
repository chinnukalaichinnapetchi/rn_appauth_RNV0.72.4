
import React, { useEffect, useState,createContext } from 'react';
import { useColorScheme } from 'react-native';
import Firstscreen from './src/Firstscreen';
import Home from './src/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer, DefaultTheme,
  DarkTheme, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export const AppContext = React.createContext();


const App =(props) => {
  const [theme,setTheme] = useState('Light');
  const themeData = { theme, setTheme };
  useEffect(() => {
    async function fetchData() {
     
      var store=await AsyncStorage.getItem('storetheme')
      console.log(store,'store');
      if(store!=undefined&&store!=null){
        setTheme(store)
      }else{
        setTheme('Light')
      }
    }
    fetchData();
  }, []);
  
  
 
  return (
    <AppContext.Provider value={themeData}>
       <NavigationContainer theme={theme == 'Light' ? DefaultTheme : DarkTheme}>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name="Firstscreen"
          component={Firstscreen}


        />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
    </AppContext.Provider>
   
  );
};
export default App;