import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {DefaultTheme, DarkTheme} from '@react-navigation/native';

//! Navigator
import WeatherView from 'features/weather/WeatherView';

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const navigationTheme = DefaultTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      <RootStack.Navigator headerMode="none">
        <RootStack.Screen name="Home" component={WeatherView} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
