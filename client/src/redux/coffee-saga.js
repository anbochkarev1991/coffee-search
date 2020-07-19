import { takeEvery, put, call } from 'redux-saga/effects';
import { signup, login, logout } from './actions/enter-actions';
import { CALL_SIGNUP } from './actions/action-types';

// user signup logic
async function fetchSignup(user) {
  const response = await fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: user.login,
      email: user.email,
      password: user.password,
      birthday: user.birthday,
    })
  });

  return response.json();
}

function* worker(action) {
  const newUser = yield call(fetchSignup, action.payload);
  yield put(signup(action.payload));
}

export default function* watcher() {
  yield takeEvery(CALL_SIGNUP, worker);
}
