import { LOAD_BATCH, ADD_BATCH, DELETE_BATCH } from './action-types';

export function loadBatch(batch, id) {
  return {
    type: LOAD_BATCH,
    payload: {
      batch,
      id,
    }
  }
}

export function addBatch(batch, id) {
  return {
    type: ADD_BATCH,
    payload: {
      batch,
      id,
    }
  }
}

export function deleteBatch(batch, id) {
  return {
    type: DELETE_BATCH,
    payload: {
      batch,
      id,
    }
  }
}
