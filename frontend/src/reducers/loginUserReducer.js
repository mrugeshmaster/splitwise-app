import { USER_LOGIN, USER_LOGOUT } from '../actions/constant-types';

const initState = {
  user: {},
};

export default function (state = initState, action) {
  switch (action.type) {
    case USER_LOGIN:
      // console.log(state)
      return {
        ...state,
        user: action.payload,
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}
