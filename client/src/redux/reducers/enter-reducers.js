import {
  CALL_SIGNUP,
  SIGNUP,
  CALL_LOGIN,
  LOGIN,
  CALL_LOGOUT,
  LOGOUT,
  EDIT_USER,
} from '../actions/action-types';

export default (state = {}, action) => {
  switch (action.type) {
    case CALL_SIGNUP:
      return state;
    case SIGNUP:
      return { ...action.payload };
    case CALL_LOGIN:
      return state;
    case LOGIN:
      return { ...action.payload };
    case CALL_LOGOUT:
      return state;
    case LOGOUT:
      return {};
    case EDIT_USER:
      return { ...action.payload };
    default:
      return state;
  }
};
