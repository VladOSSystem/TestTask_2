import { all } from 'redux-saga/effects';
// weather saga fetching
import weatherSaga from './weather/saga';

export default function* rootSaga() {
    yield all([
        weatherSaga(),
    ]);
}