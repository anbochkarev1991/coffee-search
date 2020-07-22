import { LOAD_MENU } from './action-types';

export function loadMenu(event, id) {
  return {
    type: LOAD_MENU,
    payload: {
      event,
      id,
    }
  }
}
