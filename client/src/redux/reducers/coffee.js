import { FAILED, LOAD_CAFE_LIST, SEARCH_CAFE } from '../actions/action-types';

export default (state = { list: [], error: '', search: {} }, action) => {
  switch (action.type) {
    case LOAD_CAFE_LIST:
      return {
        list: action.payload,
        error: '',
        search: {},
      };
    case FAILED:
      return { ...state, error: action.payload };
    case SEARCH_CAFE:
      return {
        ...state,
        search: action.payload,
      }
    default:
      return state;
  }
};
