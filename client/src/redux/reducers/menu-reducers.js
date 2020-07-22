import { LOAD_MENU, ADD_MENU, DELETE_MENU } from '../actions/action-types';

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_MENU:
      return {
        ...state,
        [action.payload.id]: action.payload.event,
      }
    case ADD_MENU:
      return {
        ...state,
        [action.payload.id]: [
          ...(state[action.payload.id] || []),
          action.payload.event
        ],
      }
    case DELETE_MENU:
      return {
        ...state,
        [action.payload.id]: state[action.payload.id].filter((item) => action.payload.event !== item._id)
      }
    default:
      return state;
  }
}
