import { combineReducers } from 'redux';

import { pingReducer, PING_NS } from './ping';

export const rootReducer = combineReducers({
  [PING_NS]: pingReducer,
});
