import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

// POST - User Login
export const userLogin = async ({ account, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signin`, {
      account,
      password,
    });

    if (response.status === 200 && response.data.token) {
      return { status: 'success', data: response.data };
    }

    return response.data;
  } catch (error) {
    console.error(error);
    return { status: 'error', data: error.response.data };
  }
};

// POST - User Sign Up
export const signup = async ({
  account,
  email,
  name,
  password,
  checkPassword,
}) => {
  if (!account || !email || !name || !password || !checkPassword) {
    throw new Error('All fields are required');
  }

  if (password !== checkPassword) {
    throw new Error('Password and CheckPassword do not match');
  }

  try {
    const response = await axios.post(`${BASE_URL}/users`, {
      account,
      email,
      name,
      password,
      checkPassword,
    });

    if (response.status === 200) {
      return response.data;
    }

    return response.data;
  } catch (error) {
    console.error(error);
    return { status: 'error', data: error.response.data };
  }
};

// POST - User Login
export const adminLogin = async ({ account, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/signin`, {
      account,
      password,
    });

    if (response.status === 200 && response.data.token) {
      return { status: 'success', data: response.data };
    }

    return response.data;
  } catch (error) {
    console.error(error);
    return { status: 'error', data: error.response.data };
  }
};
