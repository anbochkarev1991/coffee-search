import {
  ADD_TO_FAV,
  ADD_TO_FAV_SAGA,
  FAILED,
  LOAD_CAFE_LIST,
  LOAD_CAFE_LIST_SAGA,
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
