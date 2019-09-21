import {
  SET_USER,
  SET_USERS,
  LOGOUT_USER,
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

const logoutAndResetAppHandler = (dispatch) => () => {
  localStorage.removeItem(localStorageKeys.USER_DETAILS);
  dispatch({
    type: LOGOUT_USER,
  });
};

export {
  setLoggedInUserHandler,
  setUsersHandler,
  logoutAndResetAppHandler,
};
