import { takeEvery, put, call } from 'redux-saga/effects';
import { LOAD_CAFE_LIST_SAGA } from './actions/action-types';
import { failed, loadCafeList } from './actions/actions';

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

export default function* watcher() {
  yield takeEvery(LOAD_CAFE_LIST_SAGA, workerLoad);
}
