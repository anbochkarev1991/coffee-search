import { CALL_SIGNUP, SIGNUP, CALL_LOGIN, LOGIN, CALL_LOGOUT, LOGOUT } from '../actions/action-types';

export default (state = {}, action) => {
  switch (action.type) {
    case CALL_SIGNUP: 
      return state;
    case SIGNUP:
      return {
        ...state,
        email: action.payload.email,
        favorites: action.payload.favorites,
        userName: action.payload.login,
        subscriptions: action.payload.subscriptions,
        id: action.payload.id,
      };
    case CALL_LOGIN:
      return state;
    case LOGIN:
      return {
        ...state,
        email: action.payload.email,
        favorites: action.payload.favorites,
        userName: action.payload.login,
        subscriptions: action.payload.subscriptions,
        id: action.payload.id,
      }
    case CALL_LOGOUT:
      return state;
    case LOGOUT: 
      return {
        ...state,
        email: action.payload.email,
        favorites: action.payload.favorites,
        userName: action.payload.login,
        subscriptions: action.payload.subscriptions,
        id: action.payload.id,
      }
    default:
      return state;
  }
};
