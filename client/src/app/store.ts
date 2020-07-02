import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './reducers';
import { sagas } from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  // sagas.forEach((saga) => sagaMiddleware.run(saga, container));
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  sagas.forEach((saga) => sagaMiddleware.run(saga));
  return store;
}
