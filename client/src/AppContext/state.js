import { localStorageKeys } from '../config';

const getInitialState = () => {
  const user = localStorage.getItem(localStorageKeys.USER_DETAILS);

  const initialState = {
    user: user ? JSON.parse(user) : {},
    allUserIds: [],
    allUsersMap: {},
    messages: [],
    error: null,
  };

  return initialState;
};

export default getInitialState;
