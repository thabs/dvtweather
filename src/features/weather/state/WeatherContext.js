import {API, createDataContext} from 'utils';
//! Types
import {FETCH_LOCATION_WEATHER} from './WeatherTypes';
//! Reducer
import {weatherReducer, INITIAL_STATE} from './WeatherReducer';

const fetchLocationWeather = dispatch => async ({lat, lon}) => {
  try {
    const latdemo = -26.097074;
    const londemo = 28.116603;
    dispatch({type: FETCH_LOCATION_WEATHER.PENDING});
    const res = await API.get(`weather?lat=${latdemo}&lon=${londemo}`);
    dispatch({type: FETCH_LOCATION_WEATHER.SUCCESS, payload: res.data});
  } catch (error) {
    dispatch({
      type: FETCH_LOCATION_WEATHER.FAILURE,
      payload: error,
    });
  }
};

export const {Provider, Context} = createDataContext(
  weatherReducer,
  {
    fetchLocationWeather,
  },
  INITIAL_STATE,
);
