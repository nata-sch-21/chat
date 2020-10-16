import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app/App';
import { Env, getEnv } from './app/services/getEnv';
import { auth } from './app/services/auth';
import configureStore from './app/store';

import './index.css';

const root = document.getElementById('root');

const init = async (env: Env): Promise<void> => {
  const authUser = await auth(env);
  console.log(authUser);

  const store = configureStore(env);

  // store.dispatch(actions.setUser(data));

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
};

getEnv().then(init, () => {
  render(<div>Init error</div>, root);
});
