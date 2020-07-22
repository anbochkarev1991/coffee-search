import {
  FAILED,
  LOAD_CAFE_LIST,
  LOAD_CAFE_LIST_SAGA,
  ADD_CAFE,
  SEARCH_CAFE,
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

export function searchCafe(data) {
  return {
    type: SEARCH_CAFE,
    payload: data,
  }
}
