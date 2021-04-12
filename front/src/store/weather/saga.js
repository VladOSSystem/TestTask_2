/* eslint-disable quote-props */
import { 
    takeEvery, 
    fork, 
    put, 
    all, 
    call,
 } from 'redux-saga/effects';
import axios from 'axios';

// Fetch actionsTypes
import {
    FETCH_WEATHER_INFO,
} from './actionTypes';

// Fetch Actions
import {
    fetchWeatherSuccess,
    fetchWeatherError,
    removeResponse,
} from './actions';

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

async function fetchWeatherRequest(url) {
    const config = {
        headers: {
            // eslint-disable-next-line quote-props
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            
        },
    };
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.get(url, config);
        return await response.data;
    } catch (e) {
        throw e;
    }
}

function* fetchWeather(payload) {
    try { 
        const response = yield (call(fetchWeatherRequest, 
            `http://localhost:5001/weather_checker?appid=cf8755c4f352574152325649016b6a27&cnt=2&q=${payload.payload.q[0].toUpperCase() + payload.payload.q.toLowerCase().slice(1)}&units=metric&clientTimestamp=${payload.payload.unix}`));
        yield put(fetchWeatherSuccess(response));

    } catch (e) {
        yield put(fetchWeatherError(e));
        yield call(delay, 3000);
        yield put(removeResponse());
    }
}

export function* watchWeatherFetch() {
    yield takeEvery(FETCH_WEATHER_INFO, fetchWeather);
} 

function* FetchWeatherSaga() {
    yield all([
        fork(watchWeatherFetch),
    ]);
}

export default FetchWeatherSaga;