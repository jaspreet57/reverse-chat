import {
  SET_USER, SET_USERS, LOGOUT_USER, ADD_NEW_MESSAGE,
} from './actions-types';
import { localStorageKeys } from '../config';

const setLoggedInUserHandler = (dispatch) => (user) => {
  localStorage.setItem(localStorageKeys.USER_DETAILS, JSON.stringify(user));
  dispatch({
    type: SET_USER,
    payload: { user },
  });
};

const setUsersHandler = (dispatch) => (users) => {
  dispatch({
    type: SET_USERS,
    payload: { users },
  });
};

const newMessageHandler = (dispatch, fetchUsers) => (message, user, allUsersIds) => {
  if (!allUsersIds.includes(message.sender)) {
    return fetchUsers(user);
  }
  return dispatch({
    type: ADD_NEW_MESSAGE,
    payload: {
      message,
    },
  });
};

const logoutAndResetAppHandler = (dispatch) => () => {
  localStorage.removeItem(localStorageKeys.USER_DETAILS);
  dispatch({
    type: LOGOUT_USER,
  });
};

export {
  setLoggedInUserHandler, setUsersHandler, logoutAndResetAppHandler, newMessageHandler,
};
