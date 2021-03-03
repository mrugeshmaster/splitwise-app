import axios from 'axios';
import { USER_SIGNUP } from './constant-types';
import apiHost from '../config';

export const userSignUp = (userInfo) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.post(`${apiHost}/api/signup`, userInfo)
    .then((response) => dispatch({
      type: USER_SIGNUP,
      payload: response.data,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        console.log(error);
        return dispatch({
          type: USER_SIGNUP,
          payload: error.response.data,
        });
      }
    });
};
