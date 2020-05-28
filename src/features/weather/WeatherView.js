import React, {useState, useContext, useEffect} from 'react';
import {View, ScrollView, ImageBackground, StyleSheet} from 'react-native';
import {
  Text,
  Title,
  ActivityIndicator,
  Modal,
  Portal,
} from 'react-native-paper';
//! Components
import {TempData, ForecastData} from 'components';
//! Context
import {Context as WeatherContext} from './state/WeatherContext';

const WeatherView = () => {
  const latdemo = -26.097074;
  const londemo = 28.116603;
  //! Context
  const {state, fetchLocationWeather, fetchLocationForecast} = useContext(
    WeatherContext,
  );
  const {
    loading,
    error,
    status,
    statusColor,
    statusImage,
    temp,
    date,
    forecast,
  } = state;
  //! State
  const [timer, setTimer] = useState();

  useEffect(() => {
    if (!timer) {
      const tmr = setInterval(() => {
        fetchLocationWeather({lat: latdemo, lon: londemo});
        fetchLocationForecast({lat: latdemo, lon: londemo});
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
        <Modal visible={temp ? false : true}>
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
