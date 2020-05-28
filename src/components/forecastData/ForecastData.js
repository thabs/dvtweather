import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from 'react-native-paper';

const ForecastData = ({day, img, temp}) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.text}>{day}</Text>
      </View>
      <Image source={img} style={styles.image} />
      <View style={styles.right}>
        <Text style={styles.text}>{temp}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 12,
  },
  image: {
    width: 26,
    height: 26,
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 12,
  },
  text: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default ForecastData;
