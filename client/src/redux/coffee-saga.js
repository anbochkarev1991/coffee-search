import { takeEvery, put, call } from 'redux-saga/effects';
import {
  LOAD_CAFE_LIST_SAGA,
  EDIT_USER,
  ADD_CAFE,
  LOAD_ALL_EVENTS_SAGA,
  ADD_RATE,
  LOAD_COMMENTS_SAGA,
  LOAD_COMMENTS,
  ADD_COMMENT_SAGA,
  ADD_COMMENT,
  DELETE_COMMENT_SAGA,
  DELETE_COMMENT,
} from './actions/action-types';
import { failed, loadCafeList } from './actions/actions';
import { loadAllEvents } from './actions/events-actions';
import { loadCafeComments, addCafeComment } from './actions/comments-actions';

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

// Add new cafe
async function fetchNewCafe(cafe) {
  const response = await fetch('/api/cafes/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cafe }),
  });
  console.log(response);
  return response.json();
}

function* workerAddCafe(action) {
  const json = yield call(fetchNewCafe, action.payload);
  try {
    if (json.err) {
      yield put(failed(json.error));
    }
  } catch (err) {
    yield put(failed(err.message));
  }
}

// Load all events
async function fetchEvents() {
  const response = await fetch('/api/events');
  return response.json();
}

function* workerEvents() {
  let list;
  try {
    const json = yield call(fetchEvents);
    list = json.list;
    if (json.error) {
      yield put(failed(json.error));
    }
  } catch (error) {
    yield put(failed(error.message));
  }
  yield put(loadAllEvents(list));
}

// Add rate
async function fetchAddRate(rate) {
  const { value, user, cafe } = rate;
  const response = await fetch(`/api/cafes/${cafe}/rate`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ value, user }),
  });
  return response.json();
}

function* workerRating(action) {
  try {
    const json = yield call(fetchAddRate, action.payload);
    console.log('json:', json);
    if (json.error) {
      yield put(failed(json.error));
    }
  } catch (error) {
    yield put(failed(error.message));
  }
}

export default function* watcher() {
  yield takeEvery(LOAD_CAFE_LIST_SAGA, workerLoad);
  yield takeEvery(EDIT_USER, workerEdit);
  yield takeEvery(ADD_CAFE, workerAddCafe);
  yield takeEvery(LOAD_ALL_EVENTS_SAGA, workerEvents);
  yield takeEvery(ADD_RATE, workerRating);
}
