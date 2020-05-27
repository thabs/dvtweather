import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
//! Context
import {Context as AuthContext} from 'features/auth/state/AuthContext';

//! Navigator
import AuthNavigator from 'features/auth/AuthNavigator';
import DrawerNavigator from './DrawerNavigator';

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;
  //! Context
  const {state} = useContext(AuthContext);
  const {auth} = state;

  return (
    <NavigationContainer theme={navigationTheme}>
      <RootStack.Navigator headerMode="none">
        {!auth ? (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <RootStack.Screen name="App" component={DrawerNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
