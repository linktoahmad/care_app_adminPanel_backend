import {combineReducers} from 'redux';
import AuthReducer from './auth';
import ApplicationReducer from './application';

export default combineReducers({
  auth: AuthReducer,
  application: ApplicationReducer,
});
