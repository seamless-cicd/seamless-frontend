import { GITHUB_CLIENT_ID, GITHUB_OAUTH_URL } from '../constants';

export const loginWithGithub = () => {
  window.location.assign(GITHUB_OAUTH_URL + `?client_id=${GITHUB_CLIENT_ID}`);
};
