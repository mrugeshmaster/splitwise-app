/* eslint-disable import/no-anonymous-default-export */
import { USER_SIGNUP } from '../actions/constant-types';

const initState = {
  user: {},
};

export default function (state = initState, action) {
  switch (action.type) {
    case USER_SIGNUP:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
