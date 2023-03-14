import axios from 'axios';
import {
  API_BASE_URL,
  AUTH_PATH,
  GITHUB_CLIENT_ID,
  GITHUB_OAUTH_URL,
} from '../constants';

// If user is not logged in, directs to Github
// If user is logged in, immediately redirects back to app
export const login = () => {
  window.location.assign(GITHUB_OAUTH_URL + `?client_id=${GITHUB_CLIENT_ID}`);
};

export const tryAuthorize = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get('code');

  if (codeParam && localStorage.getItem('accessToken') === null) {
    // Try to authenticate with proxy server
    const ACCESS_TOKEN_URL = `${API_BASE_URL}/${AUTH_PATH}/access-token?code=${codeParam}`;
    console.log(ACCESS_TOKEN_URL);

    const response = await axios.get(ACCESS_TOKEN_URL);
    if (response.data.token) {
      localStorage.setItem('accessToken', response.data.token);
    }
  }
};

export const getUserData = async () => {
  const GET_USER_URL = `${API_BASE_URL}/${AUTH_PATH}/user-data`;

  const response = await axios.get(GET_USER_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};

export const logout = async () => {
  const LOGOUT_URL = `${API_BASE_URL}/${AUTH_PATH}/logout`;

  try {
    await axios.get(LOGOUT_URL);
  } catch (error) {
    console.log(error);
  } finally {
    localStorage.removeItem('accessToken');
    window.location.reload();
  }
};
