import { EDIT_USER } from './action-types';

export function editUser(user) {
  return {
    type: EDIT_USER,
    payload: user,
  };
}
