import React from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {AppDrawerNavigator} from './components/AppDrawerNavigator';
import {AppTabNavigator} from './components/AppTabNavigator';

export default function App() {
  return (
    <AppContainer/>
  );
}

const switchNavigator=createSwitchNavigator({
  WelcomeScreen:{
    screen:WelcomeScreen
  },
  Drawer:{
    screen:AppDrawerNavigator
  },
  BottomTab: {
    screen:AppTabNavigator
  }
})

const AppContainer=createAppContainer(switchNavigator)