import {MaterialCommunityIcons} from '@expo/vector-icons';
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {
  Avatar,
  Drawer,
  Switch,
  Text,
  Title,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import Animated from 'react-native-reanimated';

//! Theme Context
import {ThemeContext} from 'utils';
//! Context
import {Context as AuthContext} from 'features/auth/state/AuthContext';

export function DrawerContent(props) {
  //! Theme Context
  const paperTheme = useTheme();
  const {rtl, theme, toggleRTL, toggleTheme} = React.useContext(ThemeContext);
  //! Context
  const {signout} = React.useContext(AuthContext);

  const translateX = Animated.interpolate(props.progress, {
    inputRange: [0, 0.5, 0.7, 0.8, 1],
    outputRange: [-100, -85, -70, -45, 0],
  });

  return (
    <DrawerContentScrollView {...props}>
      <Animated.View
        //@ts-ignore
        style={[
          styles.drawerContent,
          {
            backgroundColor: paperTheme.colors.surface,
            transform: [{translateX}],
          },
        ]}>
        <View style={styles.userInfoSection}>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => {
              props.navigation.toggleDrawer();
            }}>
            <Avatar.Text size={40} label="VM" />
          </TouchableOpacity>
          <Title style={styles.title}>Vusi Mahlangu</Title>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label="Profile"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({color, size}) => (
              <MaterialCommunityIcons
                name="lock-reset"
                color={color}
                size={size}
              />
            )}
            label="Change password"
            onPress={() => {}}
          />
        </Drawer.Section>
        <Drawer.Section title="Orders">
          <DrawerItem
            icon={({color, size}) => (
              <MaterialCommunityIcons
                name="credit-card-marker-outline"
                color={color}
                size={size}
              />
            )}
            label="History"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({color, size}) => (
              <MaterialCommunityIcons
                name="home-circle"
                color={color}
                size={size}
              />
            )}
            label="Billing address"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({color, size}) => (
              <MaterialCommunityIcons
                name="home-outline"
                color={color}
                size={size}
              />
            )}
            label="Delivery address"
            onPress={() => {}}
          />
        </Drawer.Section>
        <Drawer.Section title="Preferences">
          <TouchableRipple onPress={toggleTheme}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={theme === 'dark'} />
              </View>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={toggleRTL}>
            <View style={styles.preference}>
              <Text>RTL</Text>
              <View pointerEvents="none">
                <Switch value={rtl === 'right'} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <MaterialCommunityIcons name="lock" color={color} size={size} />
            )}
            label="Sign Out"
            onPress={() => signout()}
          />
        </Drawer.Section>
      </Animated.View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
