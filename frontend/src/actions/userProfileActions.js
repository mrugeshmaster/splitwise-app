import axios from 'axios';
import { GET_USER, UPDATE_USER } from './constant-types';
import apiHost from '../config';

export const getUser = (userId) => (dispatch) => {
  axios.get(`${apiHost}/api/profile/user`, userId)
    .then((response) => response.data[0])
    .then((user) => dispatch({
      type: GET_USER,
      payload: user,
    }))
    .catch((error) => {
      console.log(error);
    });
};

export const updateUser = (userProfileInfo) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.post(`${apiHost}/api/profile/user`, userProfileInfo)
    .then((response) => response.data)
    .then((data) => {
      if (data === 'USER_UPDATED') {
        localStorage.setItem('user_id', userProfileInfo.user_id);
        alert('User Profile Updated Successfully!');
      }
      return dispatch({
        type: UPDATE_USER,
        payload: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
