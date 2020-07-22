import { LOAD_MENU } from '../actions/action-types';

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_MENU:
      return {
        ...state,
        [action.payload.id]: action.payload.event,
      }
    default:
      return state;
  }
}

