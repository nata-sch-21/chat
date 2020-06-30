import localStorage from './localStorage';
import { getHashParams, redirectToUrl, historyReplaceState } from './urlTools';

export const ACCESS_TOKEN = 'access_token';
export const CLIENT_ID = 'client_id';
export const REDIRECT_URI = 'redirect_uri';
export const RESPONSE_TYPE = 'response_type';
export const SCOPE = 'scope';

export const auth = (clientId: string | undefined, baseUrl: string | undefined) => {
  if (!clientId || !baseUrl) {
    throw Error('InitAuth error: missed configs');
  }

  let accessToken = window.location.hash.indexOf(ACCESS_TOKEN) !== -1 ? getHashParams()[ACCESS_TOKEN] : null;

  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    historyReplaceState(baseUrl);
  } else {
    accessToken = localStorage.getItem(ACCESS_TOKEN);
  }

  if (!accessToken) {
    redirectToUrl('https://accounts.google.com/o/oauth2/v2/auth', {
      [CLIENT_ID]: clientId,
      [REDIRECT_URI]: baseUrl,
      [RESPONSE_TYPE]: 'token',
      [SCOPE]: 'email profile',
    });
  }

  return accessToken;
};
