import { LOAD_BARISTA } from './action-types';

export function loadBarista(barista, id) {
  return {
    type: LOAD_BARISTA,
    payload: {
      barista,
      id,
    }
  }
}
