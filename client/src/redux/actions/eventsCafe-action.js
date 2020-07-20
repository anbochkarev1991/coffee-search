import { LOAD_CAFE_EVENTS } from './action-types';

export function loadCafeEvent(event, id) {
  return {
    type: LOAD_CAFE_EVENTS,
    payload: {
      event,
      id,
    }
  }
}
