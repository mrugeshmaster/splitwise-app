/* eslint-disable import/no-anonymous-default-export */
import { GET_USER, UPDATE_USER } from '../actions/constant-types';

const initState = {
  user: {},
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
