import axios from 'axios';
import { toast } from 'react-toastify';
import { serverConfig } from '../config';

const url = serverConfig.SERVER_BASE_URL;

const openErrorAlert = (error) => {
  // add bootstrap alert prompt here
  if (error.response && error.response.data && error.response.data.message) {
    toast.error(error.response.data.message);
  } else {
    toast.error(error.message);
  }
};

const getUsers = (token) => axios.get(`${url}/users`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const authenticateUser = async (type, loginData) => {
  let result;
  try {
    if (type === 'google') {
      const { tokenId } = loginData;
      result = await axios.post(`${url}/auth/google`, {
        access_token: tokenId,
      });
    }
    if (type === 'basic') {
      result = await axios.post(`${url}/auth/login`, {
        ...loginData,
      });
    }
  } catch (error) {
    openErrorAlert(error);
  }

  return result;
};

const signupUser = async (signupData) => {
  let result;
  try {
    result = await axios.post(`${url}/auth/signup`, {
      ...signupData,
    });
  } catch (error) {
    openErrorAlert(error);
  }

  return result;
};

export { getUsers, authenticateUser, signupUser };
