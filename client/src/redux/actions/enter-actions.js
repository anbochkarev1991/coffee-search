import {
  CALL_SIGNUP,
  SIGNUP,
  CALL_LOGIN,
  LOGIN,
  CALL_LOGOUT,
  LOGOUT,
  EDIT_USER,
  ADD_TO_FAV,
} from './action-types';

export function callSignup() {
  return {
    type: CALL_SIGNUP,
  };
}

export function signup(user) {
  return {
    type: SIGNUP,
    payload: user,
  };
}

export function callLogin() {
  return {
    type: CALL_LOGIN,
  };
}

export function loginFunc(user) {
  return {
    type: LOGIN,
    payload: user,
  };
}

export function callLogout() {
  return {
    type: CALL_LOGOUT,
  };
}

export function logout() {
  return {
    type: LOGOUT,
    payload: {},
  };
}

export function editUser(user) {
  return {
    type: EDIT_USER,
    payload: user,
  };
}
