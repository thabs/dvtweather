import axios from 'axios';
import {MainConfig} from 'configs';

const config = MainConfig.apiSettings;

const axiosConfigs = {
  baseURL: MainConfig.WeatherBaseURL,
  timeout: config.timeout,
  headers: config.headers,
};

const instance = axios.create(axiosConfigs);

//! Lets Add API key
instance.interceptors.request.use(
  request => {
    request.params = {
      ...request.params,
      units: 'metric',
      appId: MainConfig.WeatherApiKey,
    };

    return request;
  },
  err => {
    return Promise.reject(err);
  },
);

export default instance;
