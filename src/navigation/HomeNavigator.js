import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Appbar, useTheme} from 'react-native-paper';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import {LogoText} from 'components';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

export const HomeNavigator = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        header: ({scene, previous, navigation}) => {
          const {options} = scene.descriptor;
          const title =
            options.headerTitle !== undefined
              ? options.headerTitle
              : options.title !== undefined
              ? options.title
              : scene.route.name;

          return (
            <Appbar.Header theme={{colors: {primary: theme.colors.surface}}}>
              {previous ? (
                <Appbar.BackAction
                  onPress={navigation.goBack}
                  color={theme.colors.primary}
                />
              ) : (
                <TouchableOpacity
                  style={{marginLeft: 10}}
                  onPress={() => navigation.openDrawer()}>
                  <MaterialCommunityIcons
                    style={{marginRight: 10}}
                    name="menu"
                    size={40}
                    color={theme.colors.primary}
                  />
                </TouchableOpacity>
              )}
              <Appbar.Content
                title={!previous ? <LogoText fontSize={24} /> : title}
                titleStyle={{
                  fontSize: 18,
                  alignItems: 'center',
                  fontWeight: 'bold',
                  color: theme.colors.primary,
                }}
              />
            </Appbar.Header>
          );
        },
      }}>
      <Stack.Screen name="ShopList" component={TabNavigator} />
    </Stack.Navigator>
  );
};
