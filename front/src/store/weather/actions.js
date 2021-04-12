// Actions for weather statment manager 
import { 
    FETCH_WEATHER_INFO,
    ERROR_FETCH_WEATHER_INFO,
    SUCCESS_FETCH_WEATHER,  
    REMOVE_FETCH_RESPONSE,
} from './actionTypes';

export const fetchWeatherAction = (settings) => ({
        type: FETCH_WEATHER_INFO,
        payload: settings,
        fetchSuccess: false,
    }); 

export const fetchWeatherSuccess = (weather) => ({
        type: SUCCESS_FETCH_WEATHER,
        payload: weather,
        fetchSuccess: true,
    });

export const fetchWeatherError = (error) => ({
        type: ERROR_FETCH_WEATHER_INFO,
        payload: error,
        fetchSuccess: false,
    });

export const removeResponse = () => ({
        type: REMOVE_FETCH_RESPONSE,
    });