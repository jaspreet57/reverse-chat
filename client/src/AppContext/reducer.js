import getInitialState from './state';
import {
  SET_USER,
  SET_USERS,
  LOGOUT_USER,
  ADD_NEW_MESSAGE,
  SET_MESSAGES,
  SET_MESSAGE_COUNT,
  UPDATE_ONE_MESSAGE_COUNT,
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

const getUpdatedUsersMap = (allUsersMap, messageCounts) => {
  const updateUsersMap = {};
  messageCounts.forEach((messageCount) => {
    if (allUsersMap[messageCount._id]) {
      updateUsersMap[messageCount._id] = {
        ...allUsersMap[messageCount._id],
        messageCount: messageCount.count,
      };
    }
  });

  return updateUsersMap;
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
    case SET_MESSAGES:
      return {
        ...state,
        messages: [...action.payload.messages],
      };
    case SET_MESSAGE_COUNT:
      return {
        ...state,
        allUsersMap: {
          ...state.allUsersMap,
          ...getUpdatedUsersMap(state.allUsersMap, action.payload.messageCounts),
        },
      };
    case UPDATE_ONE_MESSAGE_COUNT:
      return {
        ...state,
        allUsersMap: {
          ...state.allUsersMap,
          [action.payload.sender]: {
            ...state.allUsersMap[action.payload.sender],
            messageCount: (state.allUsersMap[action.payload.sender].messageCount || 0) + 1,
          },
        },
      };
    case ADD_NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
      };
    case LOGOUT_USER:
      return getInitialState();
    default:
      throw new Error('Action type not defined');
  }
};

export default reducer;
