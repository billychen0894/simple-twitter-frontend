import sendRequest from 'api/utils';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

// export const getTweets = async () => {
//   try {
//     const response = await sendRequest(`/tweets`);
//     return response.data;
//   } catch (error) {
//     return { error: error.message };
//   }
// };
// export const getAllUser = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/admin/users`);
//     return response.data;
//   } catch (error) {
//     return { error: error.message };
//   }
// };

export const getTweets = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tweets`);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const deleteTweets = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/admin/tweets/${id}`);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const getAdminUsers = async () => {
  try {
    const data = await sendRequest(`/admin/users`);
    return data;
  } catch (error) {
    return { error: error.message };
  }
};
