import axios from 'axios';

const BASE_URL = 'https://pure-scrubland-51482.herokuapp.com/api/';

// POST - User Login
export const userLogin = async ({ account, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signin`, {
      account,
      password,
    });

    if (response.status === 200 && response.data.token) {
      return { status: 'success', ...response.data };
    }
    return { status: 'failure', ...response.data };
  } catch (error) {
    console.error(error);
    return { status: 'error', error: error.message };
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

    const { result } = response.data;

    if (response.status === 200) {
      return { message: result.message };
    }

    if (response.status === 400) {
      throw new Error(result.message);
    }

    throw new Error('Something went wrong');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to sign up');
  }
};
