import { LOAD_COMMENTS, ADD_COMMENT, DELETE_COMMENT } from '../actions/action-types';

export default (state = [], action) => {
  switch (action.type) {
    case LOAD_COMMENTS:
      return {
        ...state,
        [action.payload.id]: action.payload.comments,
      };
    case ADD_COMMENT:
      return {
        ...state,
        [action.payload.id]: [
          ...(state[action.payload.id] || []),
          ...action.payload.comment
        ],
      }
    case DELETE_COMMENT:
      return {
        ...state,
        [action.payload.id]: state[action.payload.id].filter((item) => action.payload.comment !== item._id)
      }
    default:
      return state;
  }
};
