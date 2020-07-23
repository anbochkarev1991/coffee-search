import { 
  LOAD_COMMENTS,
  LOAD_COMMENTS_SAGA,
  ADD_COMMENT,
  ADD_COMMENT_SAGA,
  DELETE_COMMENT,
  DELETE_COMMENT_SAGA
} from './action-types';

export function loadCafeCommentsSaga() {
  return {
    type: LOAD_COMMENTS_SAGA,
  }
}

export function loadCafeComments(comments, id) {
  return {
    type: LOAD_COMMENTS,
    payload: {
      comments,
      id,
    }
  }
}

export function addCafeCommentSaga() {
  return {
    type: ADD_COMMENT_SAGA,
  }
}

export function addCafeComment(comment, id) {
  return {
    type: ADD_COMMENT,
    payload: {
      comment,
      id,
    }
  }
}

export function deleteCafeCommentSaga() {
  return {
    type: DELETE_COMMENT_SAGA,
  }
}

export function deleteCafeComment(comment, id) {
  return {
    type: DELETE_COMMENT,
    payload: {
      comment,
      id,
    }
  }
}
