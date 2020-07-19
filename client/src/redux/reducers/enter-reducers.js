import { CALL_SIGNUP, SIGNUP, CALL_LOGIN, LOGIN, CALL_LOGOUT, LOGOUT } from '../actions/action-types';

export default (state = {}, action) => {
  switch (action.type) {
    case CALL_SIGNUP: 
      return state;
    case SIGNUP:
      return {
        ...state,
        userName: action.payload.login,
      };
    case CALL_LOGIN:
      return state;
    case LOGIN:
      return {
        ...state,
        userName: action.payload.login,
      }
    case CALL_LOGOUT:
      return state;
    case LOGOUT: 
      return {
        ...state,
        userName: action.payload.login,
      }
    default:
      return state;
  }
};
