import React, {useState, useContext, useEffect} from 'react';
import {View, ScrollView, ImageBackground, StyleSheet} from 'react-native';
import {Text, ActivityIndicator, Modal, Portal} from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
//! Components
import {TempData, ForecastData} from 'components';
//! Context
import {Context as WeatherContext} from './state/WeatherContext';

const WeatherView = () => {
  //! Context
  const {state, fetchLocationWeather, fetchLocationForecast} = useContext(
    WeatherContext,
  );
  const {status, statusColor, statusImage, temp, date, forecast} = state;
  //! State
  const [timer, setTimer] = useState();

  useEffect(() => {
    if (!timer) {
      const tmr = setInterval(() => {
        Geolocation.getCurrentPosition(({coords}) => {
          const {latitude, longitude} = coords;
          fetchLocationWeather({latitude, longitude});
          fetchLocationForecast({latitude, longitude});
        });
      }, 5000);

      setTimer(tmr);
    }

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <ScrollView style={[styles.container, {backgroundColor: statusColor}]}>
      <ImageBackground source={statusImage} style={styles.image}>
        <Text style={styles.date}>{date}</Text>
        <View style={styles.temp}>
          <Text style={styles.text}>
            {temp.current}
            {'\n'}
            {status}
          </Text>
        </View>
      </ImageBackground>
      <TempData min={temp.min} current={temp.current} max={temp.max} />
      {forecast.map(({day, statusImage, temp}, key) => {
        return (
          <ForecastData key={key} day={day} img={statusImage} temp={temp} />
        );
      })}
      <Portal>
        <Modal dismissable={false} visible={status ? false : true}>
          <ActivityIndicator animating={true} size="large" color={'#E50914'} />
        </Modal>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
  },
  image: {
    width: '100%',
    height: 350,
  },
  date: {
    alignSelf: 'center',
    marginTop: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  temp: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default WeatherView;
