import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app/App';
import { Config, getEnv } from './app/services/getEnv';
import { auth } from './app/services/auth';
import configureStore from './app/store';

import './index.css';

const root = document.getElementById('root');

const init = async (config: Config): Promise<void> => {
  const authUser = await auth(config);
  console.log(authUser);

  const store = configureStore();

  // store.dispatch(actions.setUser(data));

  // render(<App  />, document.getElementById('root'));
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
