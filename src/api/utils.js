import axios from 'axios';

const apiUrl = process.env.REACT_APP_API;

const sendRequest = async (
  endpoint,
  method = 'GET',
  data = null,
  headers = {}
) => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('Error: No authorization token found.');
  }

  const url = `${apiUrl}${endpoint}`;
  const axiosConfig = {
    method,
    url,
    data,
    headers: {
      ...headers,
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await axios(axiosConfig);
    return response.data;
  } catch (error) {
    throw new Error(`API request failed: ${error.message}`);
  }
};

export default sendRequest;
