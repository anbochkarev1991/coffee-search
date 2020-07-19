import { CALL_SIGNUP, SIGNUP, CALL_LOGIN, LOGIN, CALL_LOGOUT, LOGOUT } from './action-types';

export function callSignup() {
  return {
    type: CALL_SIGNUP,
  };
}

export function signup(data) {
  return {
    type: SIGNUP,
    payload: {
      login: data.login,
      email: data.email,
      password: data.password,
      birthday: data.birthday,
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
