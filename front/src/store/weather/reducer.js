// Reducer manager
import { 
    FETCH_WEATHER_INFO,
    ERROR_FETCH_WEATHER_INFO,
    SUCCESS_FETCH_WEATHER,
    REMOVE_FETCH_RESPONSE,
} from './actionTypes';

const initialState = {
    error: "",
    fetchSuccess: null,
    fetchWeather: [],
};

const fetchWeather = (state = initialState, action) => {
    
    switch (action.type) {
        case FETCH_WEATHER_INFO:
            return {
                ...state,
                fetchSuccess: false,
            };
        case SUCCESS_FETCH_WEATHER: 
            return {
                ...state,
                fetchSuccess: true,
                fetchWeather: action.payload,
            };
        case ERROR_FETCH_WEATHER_INFO:
            return { 
                ...state, 
                fetchSuccess: false,
                error: action.payload,
            };
        case REMOVE_FETCH_RESPONSE:
            return { 
                ...state, 
                fetchSuccess: null,
            };
        default:
            return {
                ...state,
            };
    }
};

export default fetchWeather;