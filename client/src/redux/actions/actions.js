import {
  FAILED,
  LOAD_CAFE_LIST,
  LOAD_CAFE_LIST_SAGA,
  ADD_CAFE,
  ADD_RATE,
} from './action-types';

export function loadCafeList(list) {
  return {
    type: LOAD_CAFE_LIST,
    payload: list,
  };
}

export function loadCafeListSaga() {
  return {
    type: LOAD_CAFE_LIST_SAGA,
  };
}

export function failed(err) {
  return {
    type: FAILED,
    payload: err,
    error: true,
  };
}

export function addNewCafe(data) {
  return {
    type: ADD_CAFE,
    payload: data,
  };
}

export function addRate(rate) {
  return {
    type: ADD_RATE,
    payload: rate,
  };
}
