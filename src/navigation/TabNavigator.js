import React from 'react';
import color from 'color';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useTheme} from 'react-native-paper';
import {useSafeArea} from 'react-native-safe-area-context';
import {useIsFocused, RouteProp} from '@react-navigation/native';

//! Navigators
import HandsNavigator from 'features/hands/HandsNavigator';
import FaceNavigator from 'features/face/FaceNavigator';
import ClothingNavigator from 'features/clothing/ClothingNavigator';
import CartNavigator from 'features/cart/CartNavigator';
//! Layouts
import {overlay} from 'utils';

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  const theme = useTheme();

  const tabBarColor = theme.dark
    ? overlay(6, theme.colors.surface)
    : theme.colors.surface;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      shifting={true}
      activeColor={theme.colors.primary}
      inactiveColor={color(theme.colors.text).alpha(0.6).rgb().string()}
      sceneAnimationEnabled={false}>
      <Tab.Screen
        name="Hands"
        component={HandsNavigator}
        options={{
          tabBarIcon: 'hand',
          tabBarColor,
        }}
      />
      <Tab.Screen
        name="Face"
        component={FaceNavigator}
        options={{
          tabBarIcon: 'face',
          tabBarColor,
        }}
      />
      <Tab.Screen
        name="Clothing"
        component={ClothingNavigator}
        options={{
          tabBarIcon: 'human-handsdown',
          tabBarColor,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: 'cart',
          tabBarColor,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
