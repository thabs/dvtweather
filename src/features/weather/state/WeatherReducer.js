import {dateToString} from 'utils';
import {FETCH_LOCATION_WEATHER, FETCH_LOCATION_FORECAST} from './WeatherTypes';
//! Configs
import {MainConfig} from 'configs';
const Colors = MainConfig.Colors;

const INITIAL_STATE = {
  loading: false,
  error: '',
  status: '',
  statusColor: Colors.Sunny,
  statusImage: require('../../../assets/sea_sunny.png'),
  temp: {},
  date: '',
  forecast: [],
};

const setWeather = (state, payload) => {
  const {weather, main, dt} = payload;
  //! Temperature
  const current = parseInt(main.temp);
  const min = parseInt(main.temp_min);
  const max = parseInt(main.temp_max);

  const strCurrent = `${current}${'\u00B0'}`;
  const strMin = `${min}${'\u00B0'}`;
  const strMax = `${max}${'\u00B0'}`;

  temp = {current: strCurrent, min: strMin, max: strMax};
  //! Time
  const ml = dt * 1000;
  const dateTime = new Date(ml);
  date = dateToString(dateTime);

  //! Status
  const oldStatus = state.status;
  if (oldStatus !== weather[0].main) {
    status = weather[0].main;
    //! Status Color
    switch (status) {
      case 'Clouds':
        statusColor = Colors.Cloudy;
        status = 'CLOUDY';
        statusImage = require('../../../assets/sea_cloudy.png');
        break;
      case 'Rain':
        statusColor = Colors.Rainy;
        status = 'RAINY';
        statusImage = require('../../../assets/sea_rainy.png');
        break;
      default:
        statusColor = Colors.Sunny;
        status = 'SUNNY';
        statusImage = require('../../../assets/sea_sunny.png');
    }

    return {
      ...state,
      loading: false,
      status,
      statusColor,
      statusImage,
      temp,
      date,
    };
  }

  //!  Only update temparature
  return {
    ...state,
    loading: false,
    temp,
    date,
  };
};

const setForecast = (state, payload) => {
  const {list} = payload;

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  let array = [];
  list.forEach(element => {
    const dt = element.dt;
    //! Get Day
    const ml = dt * 1000;
    const d = new Date(ml);
    const day = days[d.getDay()];

    const temp = parseInt(element.main.temp);
    const strTemp = `${temp}${'\u00B0'}`;

    const status = element.weather[0].main;

    let statusImage = '';
    switch (status) {
      case 'Clouds':
        statusImage = require('../../../assets/clouds.png');
        break;
      case 'Rain':
        statusImage = require('../../../assets/rain.png');
        break;
      default:
        statusImage = require('../../../assets/clear.png');
    }

    array.push({day, dt, temp: strTemp, statusImage});
  });

  return {
    ...state,
    loading: false,
    forecast: array,
  };
};

const weatherReducer = (state, action) => {
  switch (action.type) {
    case FETCH_LOCATION_WEATHER.PENDING:
    case FETCH_LOCATION_FORECAST.PENDING:
      return {...state, loading: true, error: ''};
    case FETCH_LOCATION_WEATHER.SUCCESS:
      return setWeather(state, action.payload);
    case FETCH_LOCATION_FORECAST.SUCCESS:
      return setForecast(state, action.payload);
    case FETCH_LOCATION_WEATHER.FAILURE:
    case FETCH_LOCATION_FORECAST.FAILURE:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};

export {weatherReducer, INITIAL_STATE};
