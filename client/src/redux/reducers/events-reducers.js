import { FAILED, LOAD_ALL_EVENTS } from '../actions/action-types';

export default (state = { list: [], error: '' }, action) => {
  switch (action.type) {
    case LOAD_ALL_EVENTS:
      return {
        list: [...action.payload],
        error: '',
      };
    case FAILED:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
