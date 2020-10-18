import { forEach, keys } from 'lodash';

interface Params {
  [key: string]: string;
}

export const getHashParams = (): Params => {
  const hash = window.location.hash;

  const params: { [key: string]: string } = {};
  forEach(hash.substring(1).split('&'), (hk: string) => {
    const temp: string[] = hk.split('=');
    params[temp[0]] = temp[1];
  });

  return params;
};

export const redirectToUrl = (path: string, params?: Params): void => {
  if (params) {
    const queryString = keys(params)
      .map(
        (key: string) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
      )
      .join('&');

    path += `?${queryString}`;
  }

  window.location.href = path;
};

export const historyReplaceState = (
  url: string,
  title = document.title,
  data = '',
): void => {
  window.history.replaceState(data, title, url);
};

export const replaceSlashes = (string: string): string =>
  string.replace(/\//g, '\\/');
