import { LOAD_CAFE_LIST } from './action-types';

export function loadCafeList(list) {
  return {
    action: LOAD_CAFE_LIST,
    payload: list,
  };
}
