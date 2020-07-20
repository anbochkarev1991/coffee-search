import { LOAD_CAFE_EVENTS } from '../actions/action-types';

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_CAFE_EVENTS:
      return {
        ...state,
        [action.payload.id]: action.payload.event,
      };
    default:
      return state;
  }
};
