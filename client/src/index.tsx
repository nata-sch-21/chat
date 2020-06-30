import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { Config, getEnv } from './app/services/getEnv';
import { auth } from './app/services/auth';

import './index.css';

const root = document.getElementById('root');

const init = async (config: Config): Promise<void> => {
  const accessToken = auth(config.clientId, config.baseUrl);
  if (!accessToken) return;

  try {
    const tokenRes: Response = await fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${accessToken}`); //verify tocken
    const d = await tokenRes.json(); // return d.error if not valid
    const res: Response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
      // mode: 'no-cors',
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    });
    const json = await res.json();
    console.log(json);
  } catch (e) {
    console.log(e.message);
  }

  localStorage.removeItem('access_token');

  // const store = configureStore();
  // const configs = initConfigs();
  // const accessToken = initAuth(configs);
  //
  // if (!accessToken) return;
  //
  // const client = initClient({ accessToken, ...configs });
  //
  // store.dispatch(actions.setConfigs(configs));
  // store.dispatch(actions.setClient(client));
  //
  // const { status, data } = await api(client).fetchUser();
  //
  // if (status === clientStatuses.ERROR || !data) {
  //   localStorage.removeItem(ACCESS_TOKEN);
  //   redirectToUrl(configs.authUrl, { [CLIENT_ID]: configs.clientId });
  //   return;
  // }
  //
  // store.dispatch(actions.setUser(data));

  // render(<App store={store} />, document.getElementById('root'));
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
  );
};

getEnv().then(init, () => {
  render(<div>Init error</div>, root);
});
