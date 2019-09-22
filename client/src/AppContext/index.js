import { useReducer, useRef, useEffect } from 'react';
import createUseContext from 'constate';
import reducer from './reducer';
import getInitialState from './state';
import initSocket from '../socket';

import {
  setLoggedInUserHandler,
  setUsersHandler,
  logoutAndResetAppHandler,
  newMessageHandler,
} from './action-handlers';

import { fetchUsersData } from './backend';

const initialState = getInitialState();

const AppContext = () => {
  const socketMethods = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    user, allUserIds, allUsersMap, messages,
  } = state;

  const setUsers = useRef(setUsersHandler(dispatch));
  const setUser = useRef(setLoggedInUserHandler(dispatch));
  const logoutAndResetApp = useRef(logoutAndResetAppHandler(dispatch));

  const logoutUser = useRef(() => {
    if (socketMethods.current) {
      socketMethods.current.close();
      socketMethods.current = null;
    }
    logoutAndResetApp.current();
  });

  const fetchUsers = useRef(fetchUsersData(setUsers.current, logoutUser.current));
  const newMessage = useRef(newMessageHandler(dispatch, fetchUsers.current));

  // integration with socket module
  useEffect(() => {
    if (user && user.email && allUserIds.length) {
      if (socketMethods.current) {
        socketMethods.current.close();
      }
      socketMethods.current = initSocket({
        user,
        newMessage: (message) => {
          newMessage.current(message, user, allUserIds);
        },
      });
    }
  }, [user, allUserIds]);

  const sendMessage = useRef((text) => {
    if (socketMethods) {
      socketMethods.current.sendMessage({
        text,
      });
    }
  });

  return {
    user,
    messages,
    setUser: setUser.current,
    logoutUser: logoutUser.current,
    allUserIds,
    allUsersMap,
    fetchUsers: fetchUsers.current,
    sendMessage: sendMessage.current,
  };
};

const useAppContext = createUseContext(AppContext);

export { useAppContext, AppContext };
