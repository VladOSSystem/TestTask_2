import { combineReducers } from 'redux';
// Weather fetching
import Weather from './weather/reducer';

const rootReducer = combineReducers({
    Weather,
});

export default rootReducer;