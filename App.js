import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native'
import Home from './components/home';
import About from './components/about';

export default function App() {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'home'} >
        <Stack.Screen name={'home'} component={Home} />
        <Stack.Screen name={'about'} component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

