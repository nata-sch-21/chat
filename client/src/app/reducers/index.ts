import { combineReducers } from 'redux';

import { pingReducer, PING_NS } from './ping';
import { userReducer, USER_NS } from './user';

export const rootReducer = combineReducers({
  [PING_NS]: pingReducer,
  [USER_NS]: userReducer,
});
