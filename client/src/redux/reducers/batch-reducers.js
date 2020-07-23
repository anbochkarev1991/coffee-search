import { LOAD_BATCH, ADD_BATCH, DELETE_BATCH } from '../actions/action-types';

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_BATCH:
      return {
        ...state,
        [action.payload.id]: action.payload.batch,
      }
    case ADD_BATCH:
      return {
        ...state,
        [action.payload.id]: [
          ...(state[action.payload.id] || []),
          action.payload.batch,
        ],
      };
    case DELETE_BATCH:
      return {
        ...state,
        [action.payload.id]: state[action.payload.id].filter(
          (item) => action.payload.batch !== item._id,
        ),
      };
    default:
      return state;
  }
}
