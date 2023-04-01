import sendRequest from 'api/utils';

export const getUser = async (id) => {
  try {
    const data = await sendRequest(`/users/${id}`);
    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export const getUserTweets = async (id) => {
  try {
    const data = await sendRequest(`/users/${id}/tweets`);
    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export const getUserRepliedTweets = async (id) => {
  try {
    const data = await sendRequest(`/users/${id}/replied_tweets`);
    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export const getUserLikes = async (id) => {
  try {
    const data = await sendRequest(`/users/${id}/likes`);
    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export const getUserFollowers = async (id) => {
  try {
    const data = await sendRequest(`/users/${id}/followers`);
    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export const getUserFollowings = async (id) => {
  try {
    const data = await sendRequest(`/users/${id}/followings`);
    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export const updateUser = async (id, payload) => {
  try {
    const data = await sendRequest(`/users/${id}`, 'PUT', payload);
    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export const updateUserSettings = async (id, payload) => {
  try {
    const data = await sendRequest(`/users/${id}/setting`, 'PUT', payload);
    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export const getTop10Users = async () => {
  try {
    const data = await sendRequest(`/users/top`);
    return data;
  } catch (error) {
    return { error: error.message };
  }
};
