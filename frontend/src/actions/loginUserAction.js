import axios from 'axios';
import { USER_LOGIN, USER_LOGOUT } from './constant-types';
import apiHost from '../config';

export const userLogin = (loginInfo) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.post(`${apiHost}/api/login`, loginInfo)
    .then((response) => dispatch({
      type: USER_LOGIN,
      payload: response.data,
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: USER_LOGIN,
          payload: error.response.data,
        });
      }
    });
};

export const userLogout = () => (dispatch) => dispatch({ type: USER_LOGOUT });
