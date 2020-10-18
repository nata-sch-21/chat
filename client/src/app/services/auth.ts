import localStorage from './localStorage';
import { getHashParams, redirectToUrl, historyReplaceState } from './urlTools';
import { Env } from './getEnv';
import { User } from '../types';

export const ACCESS_TOKEN = 'access_token';
export const CLIENT_ID = 'client_id';
export const REDIRECT_URI = 'redirect_uri';
export const RESPONSE_TYPE = 'response_type';
export const SCOPE = 'scope';

interface AuthUser {
  sud: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
}

const redirectToAuth = (
  authUrl: string,
  baseUrl: string,
  clientId: string,
): void => {
  redirectToUrl(authUrl, {
    [CLIENT_ID]: clientId,
    [REDIRECT_URI]: baseUrl,
    [RESPONSE_TYPE]: 'token',
    [SCOPE]: 'email profile',
  });
};

export const auth = async ({
  clientId,
  baseUrl,
  authUrl,
  userInfoUrl,
}: Env): Promise<User> => {
  let accessToken =
    window.location.hash.indexOf(ACCESS_TOKEN) !== -1
      ? getHashParams()[ACCESS_TOKEN]
      : '';

  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    historyReplaceState(baseUrl);
  } else {
    accessToken = localStorage.getItem(ACCESS_TOKEN) || '';
  }

  if (!accessToken) {
    redirectToAuth(authUrl, baseUrl, clientId);
  }

  const res: Response = await fetch(userInfoUrl, {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  });
  const data = await res.json();

  if (!data || data.error) {
    localStorage.removeItem(ACCESS_TOKEN);
    redirectToAuth(authUrl, baseUrl, clientId);
  }

  return {
    id: data.sub,
    email: data.email,
    avatar: data.picture,
    username: data.name,
  };
};
