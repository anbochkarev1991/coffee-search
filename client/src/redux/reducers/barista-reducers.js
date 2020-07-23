import { LOAD_BARISTA } from '../actions/action-types';

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_BARISTA:
      return {
        ...state,
        [action.payload.id]: action.payload.barista,
      }
    default:
      return state;
  }
}
