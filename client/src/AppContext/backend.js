import { getUsers } from '../API';

const fetchUsersApi = (setUsers) => async (user) => {
  const { data: users } = await getUsers(user.authToken);
  setUsers(users);
};

const otherApis = {};

export {
  fetchUsersApi,
  otherApis,
};
