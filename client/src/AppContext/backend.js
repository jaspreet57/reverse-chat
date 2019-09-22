import { toast } from 'react-toastify';
import { getUsers } from '../API';

const fetchUsersApi = (setUsers, logoutUser) => async (user) => {
  try {
    const { data: users } = await getUsers(user.authToken);
    setUsers(users);
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

export {
  fetchUsersApi,
  otherApis,
};
