import { combineReducers } from 'redux';

import { pingReducer, PING_NS } from './ping';
import { userReducer, USER_NS } from './user';
import { messagesReducer, MESSAGES_NS } from './messages';

export const rootReducer = combineReducers({
  [PING_NS]: pingReducer,
  [USER_NS]: userReducer,
  [MESSAGES_NS]: messagesReducer,
});
