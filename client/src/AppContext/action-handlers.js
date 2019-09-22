import {
  SET_USER,
  SET_USERS,
  LOGOUT_USER,
  ADD_NEW_MESSAGE,
  SET_MESSAGES,
  SET_MESSAGE_COUNT,
  UPDATE_ONE_MESSAGE_COUNT,
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

const setMessagesHandler = (dispatch) => (messages) => {
  dispatch({
    type: SET_MESSAGES,
    payload: { messages },
  });
};

const setMessageCountHandler = (dispatch) => (messageCounts) => {
  dispatch({
    type: SET_MESSAGE_COUNT,
    payload: { messageCounts },
  });
};

const updateOneMessageCount = (dispatch) => (sender) => {
  dispatch({
    type: UPDATE_ONE_MESSAGE_COUNT,
    payload: { sender },
  });
};

const newMessageHandler = (dispatch, fetchUsers) => (message, user, allUsersIds) => {
  if (!allUsersIds.includes(message.sender)) {
    return fetchUsers(user);
  }
  dispatch({
    type: ADD_NEW_MESSAGE,
    payload: {
      message,
    },
  });
  return updateOneMessageCount(dispatch)(message.sender);
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
  newMessageHandler,
  setMessagesHandler,
  setMessageCountHandler,
  updateOneMessageCount,
};
