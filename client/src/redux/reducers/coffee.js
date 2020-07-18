import { FAILED, LOAD_CAFE_LIST } from '../actions/action-types';

export default (state = { list: [], error: '' }, action) => {
  switch (action.type) {
    case LOAD_CAFE_LIST:
      return {
        list: action.payload,
        error: '',
      };
    case FAILED:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

