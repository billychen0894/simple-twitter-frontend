import sendRequest from 'api/utils';

export const removeUserTweet = async (tweetId) => {
  try {
    const response = await sendRequest(`/admin/tweets/${tweetId}`, 'DELETE');
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllUsers = async () => {
  try {
    const data = await sendRequest(`/admin/users`);
    return data;
  } catch (error) {
    return error;
  }
};
