import { LOAD_CAFE_EVENTS, ADD_CAFE_EVENTS, DELETE_CAFE_EVENTS } from '../actions/action-types';

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_CAFE_EVENTS:
      return {
        ...state,
        [action.payload.id]: action.payload.event,
      };
    case ADD_CAFE_EVENTS:
      return {
        ...state,
        [action.payload.id]: [
          ...(state[action.payload.id] || []),
          ...action.payload.event
        ],
      }
      case DELETE_CAFE_EVENTS:
      return {
        ...state,
        [action.payload.id]: state[action.payload.id].filter((item) => action.payload.event !== item._id)
      }
    default:
      return state;
  }
};
