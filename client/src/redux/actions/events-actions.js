import { FAILED, LOAD_ALL_EVENTS, LOAD_ALL_EVENTS_SAGA } from './action-types';

export function loadAllEvents(list) {
  return {
    type: LOAD_ALL_EVENTS,
    payload: list,
  };
}

export function loadAllEventsSaga() {
  return {
    type: LOAD_ALL_EVENTS_SAGA,
  };
}
