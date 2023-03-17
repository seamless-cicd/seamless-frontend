/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios';
import {
  AUTH_PATH,
  GITHUB_CLIENT_ID,
  GITHUB_OAUTH_URL,
  USER_PATH,
} from '../constants';
import { API_BASE_URL } from '../utils/config';

// If user is not logged in, directs to Github
// If user is logged in, immediately redirects back to app
export const login = () => {
  window.location.assign(
    GITHUB_OAUTH_URL +
      `?client_id=${GITHUB_CLIENT_ID}&scope=repo%20write:repo_hook`
  );
};

export const tryAuthorize = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get('code');

  if (codeParam && localStorage.getItem('accessToken') === null) {
    // Try to authenticate with proxy server
    const ACCESS_TOKEN_URL = `${AUTH_PATH}/access-token?code=${codeParam}`;
    console.log(ACCESS_TOKEN_URL);

    const response = await axiosGetAuthenticated(ACCESS_TOKEN_URL);
    if (response.data.token) {
      localStorage.setItem('accessToken', response.data.token);
    }
  }
};

export const getUserData = async () => {
  const response = await axiosGetAuthenticated(USER_PATH, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};

export const logout = async () => {
  const LOGOUT_URL = `${AUTH_PATH}/logout`;

  try {
    await axiosGetAuthenticated(LOGOUT_URL);
  } catch (error) {
    console.log(error);
  } finally {
    localStorage.removeItem('accessToken');
    window.location.reload();
  }
};

export const axiosGetAuthenticated = (
  url: string,
  config?: AxiosRequestConfig<any> | undefined
) => {
  return axios.get(url, {
    ...config,
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  });
};

export const axiosPostAuthenticated = (
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any> | undefined
) => {
  return axios.post(url, data, {
    ...config,
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  });
};
export const axiosPatchAuthenticated = (
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any> | undefined
) => {
  return axios.patch(url, data, {
    ...config,
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  });
};

export const axiosDeleteAuthenticated = (
  url: string,
  config?: AxiosRequestConfig<any> | undefined
) => {
  return axios.delete(url, {
    ...config,
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  });
};
