import { CALL_SIGNUP, SIGNUP, CALL_LOGIN, LOGIN, CALL_LOGOUT, LOGOUT } from './action-types';

export function callSignup() {
  return {
    type: CALL_SIGNUP,
  };
}

export function signup(payload) {
  return {
    type: SIGNUP,
    payload: {
      login: payload.login,
      email: payload.email,
      password: payload.password,
      birthday: payload.birthday,
    },
  };
}

export function callLogin() {
  return {
    type: CALL_LOGIN,
  };
}

export function loginFunc(login) {
  return {
    type: LOGIN,
    payload: {
      login,
    }
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
    payload: {
      login: '',
    }
  };
}
