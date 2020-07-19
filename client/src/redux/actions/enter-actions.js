import {
  CALL_SIGNUP,
  SIGNUP,
  CALL_LOGIN,
  LOGIN,
  CALL_LOGOUT,
  LOGOUT,
  EDIT_USER,
} from './action-types';

export function callSignup() {
  return {
    type: CALL_SIGNUP,
  };
}

export function signup(data) {
  return {
    type: SIGNUP,
    payload: {
      email: data.email,
      favorites: data.favorites,
      login: data.login,
      subscriptions: data.subscriptions,
      id: data._id,
    },
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
    payload: {
      email: '',
      favorites: '',
      login: '',
      subscriptions: '',
      id: '',
    },
  };
}

export function editUser(user) {
  return {
    type: EDIT_USER,
    payload: user,
  };
}
