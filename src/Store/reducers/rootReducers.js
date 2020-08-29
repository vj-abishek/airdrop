import { combineReducers } from 'redux';
import authReducer from './authReducer';
import firestoreReducer from './firestoreReducer';
import channelReducer from './channelReducer';

const rootReducer = combineReducers({
    authReducer,
    firestoreReducer,
    channelReducer,
});

export default rootReducer;
