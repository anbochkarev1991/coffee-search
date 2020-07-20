import { takeEvery, put, call } from 'redux-saga/effects';
import { LOAD_CAFE_LIST_SAGA, EDIT_USER } from './actions/action-types';
import { failed, loadCafeList } from './actions/actions';
// import { CALL_SIGNUP } from './actions/action-types';

// Load list of all cafes from DB
async function fetchCafesList() {
  const response = await fetch('/api/cafes');
  return response.json();
}

function* workerLoad() {
  let list;
  try {
    const result = yield call(fetchCafesList);
    list = result.list;
  } catch (error) {
    yield put(failed(error.message));
  }
  yield put(loadCafeList(list));
}

// Edit user info
async function fetchEdit(user) {
  const response = await fetch('/api/users', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user }),
  });
  return response.json();
}

function* workerEdit(action) {
  try {
    const json = yield call(fetchEdit, action.payload);
    if (json.error) {
      yield put(failed(json.error));
    }
  } catch (error) {
    yield put(failed(error.message));
  }
}

// // user signup logic
// async function fetchSignup(user) {
//   const response = await fetch('/api/signup', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       login: user.login,
//       email: user.email,
//       password: user.password,
//       birthday: user.birthday,
//     }),
//   });

//   return response.json();
// }

// function* workerSignup(action) {
//   const newUser = yield call(fetchSignup, action.payload);
//   yield put(signup(action.payload));
// }

export default function* watcher() {
  yield takeEvery(LOAD_CAFE_LIST_SAGA, workerLoad);
  yield takeEvery(EDIT_USER, workerEdit);
  // yield takeEvery(CALL_SIGNUP, workerSignup);
}
