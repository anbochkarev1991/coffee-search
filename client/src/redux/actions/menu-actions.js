import { LOAD_MENU, ADD_MENU, DELETE_MENU } from './action-types';

export function loadMenu(event, id) {
  return {
    type: LOAD_MENU,
    payload: {
      event,
      id,
    }
  }
}

export function addItemMenu(event, id) {
  return {
    type: ADD_MENU,
    payload: {
      event,
      id,
    }
  }
}

export function deleteItemMenu(event, id) {
  return {
    type: DELETE_MENU,
    payload: {
      event,
      id,
    }
  }
}
