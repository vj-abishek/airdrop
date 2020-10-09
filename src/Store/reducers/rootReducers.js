import { combineReducers } from 'redux';
import authReducer from './authReducer';
import firestoreReducer from './firestoreReducer';
import channelReducer from './channelReducer';
import peerReducer from './peerReducer';
import messageReducer from './messageReducer';

const rootReducer = combineReducers({
  authReducer,
  firestoreReducer,
  channelReducer,
  peerReducer,
  messageReducer,
});

export default rootReducer;
