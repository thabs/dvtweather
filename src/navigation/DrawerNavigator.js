import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {HomeNavigator} from './HomeNavigator';
import {DrawerContent} from './DrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
