import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  PermissionsAndroid,
  Platform,
  BackHandler,
  Image,
} from 'react-native';

const img = require('../../assets/forest_cloudy.png');

const Permissions = ({navigation}) => {
  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Permission',
            message:
              'DVT Weather App needs access to your location to provide weather infomation.',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          navigation.navigate('Home');
        } else {
          BackHandler.exitApp();
        }
      } catch (err) {
        console.warn(err);
      }
    };

    //! For now lets do for Android, if ios goto home screen
    if (Platform.OS === 'ios') navigation.navigate('Home');
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={img} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#54717A',
  },
  image: {
    width: '100%',
    height: 350,
  },
});

export default Permissions;
