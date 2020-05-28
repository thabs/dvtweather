import {API, createDataContext} from 'utils';
//! Types
import {FETCH_LOCATION_WEATHER, FETCH_LOCATION_FORECAST} from './WeatherTypes';
//! Reducer
import {weatherReducer, INITIAL_STATE} from './WeatherReducer';

const fetchLocationWeather = dispatch => async ({lat, lon}) => {
  try {
    dispatch({type: FETCH_LOCATION_WEATHER.PENDING});
    const res = await API.get(`weather?lat=${lat}&lon=${lon}`);
    dispatch({type: FETCH_LOCATION_WEATHER.SUCCESS, payload: res.data});
  } catch (error) {
    dispatch({
      type: FETCH_LOCATION_WEATHER.FAILURE,
      payload: error,
    });
  }
};

const fetchLocationForecast = dispatch => async ({lat, lon}) => {
  try {
    dispatch({type: FETCH_LOCATION_FORECAST.PENDING});
    const res = await API.get(`forecast?lat=${lat}&lon=${lon}`);
    dispatch({type: FETCH_LOCATION_FORECAST.SUCCESS, payload: res.data});
  } catch (error) {
    dispatch({
      type: FETCH_LOCATION_FORECAST.FAILURE,
      payload: error,
    });
  }
};

export const {Provider, Context} = createDataContext(
  weatherReducer,
  {
    fetchLocationWeather,
    fetchLocationForecast,
  },
  INITIAL_STATE,
);
