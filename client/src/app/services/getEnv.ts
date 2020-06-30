const devConfigs = {
  clientId: process.env.REACT_APP_CLIENT_ID,
  baseUrl: process.env.REACT_APP_BASE_URL,
};

export interface Config {
  [key: string]: string | undefined;
}

export const getEnv = async (): Promise<Config> => {
  console.log(process.env);
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve(devConfigs);
  }

  const res: Response = await fetch('api/config');

  const data = await res.json();

  if (!data) {
    return Promise.reject('Error on fetching config');
  }

  return Promise.resolve(data);
};
