import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from './reducers';
import { rootSaga } from './sagas';
import { Env } from './services/getEnv';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export default function configureStore(env: Env): Store {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );

  const socket = new WebSocket(env.wsUrl);
  sagaMiddleware.run(rootSaga, { socket });
  return store;
}
