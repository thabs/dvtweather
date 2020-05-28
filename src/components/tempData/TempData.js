import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

const TempData = ({min, current, max}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.left}>
          <Text style={styles.text}>
            {min}
            {'\n'}
            {'min'}
          </Text>
        </View>
        <Text style={styles.text}>
          {current}
          {'\n'}
          {'Current'}
        </Text>
        <View style={styles.right}>
          <Text style={styles.text}>
            {max}
            {'\n'}
            {'max'}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: '#FFFFFF',
          borderBottomWidth: 1,
        }}
      />
    </>
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
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 12,
  },
  text: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default TempData;
