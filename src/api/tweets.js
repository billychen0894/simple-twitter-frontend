import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const getTweets = async () => {
  try {
    const res = await axios.get(`$(BASE_URL)/tweets`);
    return res.data;
  } catch (error) {
    console.error('[Get Tweets failed]: ', error);
  }
};

export const deleteTweets = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/tweets/${id}`);
    return res.data;
  } catch (error) {
    console.error('[Delete Tweets failed]: ', error);
  }
};
