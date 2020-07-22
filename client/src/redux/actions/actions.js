import {
  FAILED,
  LOAD_CAFE_LIST,
  LOAD_CAFE_LIST_SAGA,
  ADD_CAFE,
<<<<<<< HEAD
  ADD_RATE,
=======
  SEARCH_CAFE,
>>>>>>> a59aa9d42b6ec5b10aa1df6ad2716335928d7031
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
export function searchCafe(data) {
  return {
    type: SEARCH_CAFE,
    payload: data,
  }
}
