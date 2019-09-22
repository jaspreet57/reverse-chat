import { useReducer, useRef } from 'react';
import createUseContext from 'constate';
import reducer from './reducer';
import getInitialState from './state';

import {
  setLoggedInUserHandler,
  setUsersHandler,
  logoutAndResetAppHandler,
} from './action-handlers';

import {
  fetchUsersApi,
} from './backend';

const initialState = getInitialState();

const AppContext = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    user,
    allUserIds,
    allUsersMap,
  } = state;

  const setUsers = useRef(setUsersHandler(dispatch));
  const setUser = useRef(setLoggedInUserHandler(dispatch));
  const logoutAndResetApp = useRef(logoutAndResetAppHandler(dispatch));

  const logoutUser = useRef(() => {
    // todo : close socket connections here
    logoutAndResetApp.current();
  });

  const fetchUsers = useRef(fetchUsersApi(setUsers.current, logoutUser.current));

  return {
    user,
    setUser: setUser.current,
    logoutUser: logoutUser.current,
    allUserIds,
    allUsersMap,
    fetchUsers: fetchUsers.current,
  };
};

const useAppContext = createUseContext(AppContext);

export { useAppContext, AppContext };
