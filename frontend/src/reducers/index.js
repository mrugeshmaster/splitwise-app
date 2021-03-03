import { combineReducers } from 'redux';
import loginUserReducer from './loginUserReducer';
import signUpUserReducer from './signUpUserReducer';
import userProfileReducer from './userProfileReducer';
// import signupReducer from './signupReducer';

export default combineReducers({
  login: loginUserReducer,
  signup: signUpUserReducer,
  userProfile: userProfileReducer,
});
