import getInitialState from './state';
import {
  SET_USER,
  SET_USERS,
  LOGOUT_USER,
} from './actions-types';

const generateUsersMap = (users) => {
  const allUsersMap = users.reduce((acc, user) => {
    acc[user._id] = {
      ...user,
    };
    return acc;
  }, {});
  const allUserIds = Object.keys(allUsersMap);
  return {
    allUsersMap,
    allUserIds,
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        ...generateUsersMap(action.payload.users),
      };
    case SET_USER:
      return {
        ...state,
        user: { ...action.payload.user },
      };
    case LOGOUT_USER:
      return getInitialState();
    default:
      throw new Error('Action type not defined');
  }
};

export default reducer;
