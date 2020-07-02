import { ApiResponseConfig, fetchConfig } from './api';

const devConfigs = {
  clientId: process.env.REACT_APP_CLIENT_ID || '',
  baseUrl: process.env.REACT_APP_BASE_URL || '',
  authUrl: process.env.REACT_APP_AUTH_URL || '',
  userInfoUrl: process.env.REACT_APP_USER_INFO_URL || '',
};

export interface Config {
  clientId: string;
  baseUrl: string;
  authUrl: string;
  userInfoUrl: string;
}

export const getEnv = async (): Promise<Config> => {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve(devConfigs);
  }

  const res: ApiResponseConfig = await fetchConfig();

  if (!res.data) {
    return Promise.reject('Error on getting config');
  }

  return Promise.resolve(res.data);
};
