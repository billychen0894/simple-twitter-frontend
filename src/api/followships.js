import sendRequest from 'api/utils';

export const followUser = async (payload) => {
  try {
    const data = await sendRequest(`/followships`, 'POST', payload);
    return data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

export const unFollowUser = async (id) => {
  try {
    const data = await sendRequest(`/followships/${id}`, 'DELETE');
    return data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};
