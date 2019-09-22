import { toast } from 'react-toastify';
import { getUsers, getMessageCount, getMessages } from '../API';

const fetchUsersData = ({
  setUsers, setMessages, setMessageCount, logoutUser,
}) => async (
  user,
) => {
  try {
    const [{ data: users }, { data: messageCounts }, { data: messages }] = await Promise.all([
      getUsers(user.authToken),
      getMessageCount(user.authToken),
      getMessages(user.authToken),
    ]);
    setUsers(users);
    setMessages(messages);
    setMessageCount(messageCounts);
  } catch (error) {
    if (error && error.response && error.response.status === 401) {
      toast.error('Session Expired !');
      logoutUser();
    } else {
      toast.error(error.message || 'Api request failed!');
    }
  }
};

const otherApis = {};

export { fetchUsersData, otherApis };
