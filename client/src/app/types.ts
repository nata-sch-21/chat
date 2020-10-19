import { PingState, PING_NS } from './reducers/ping';
import { UserState, USER_NS } from './reducers/user';
import { MessagesState, MESSAGES_NS } from './reducers/messages';

export interface GlobalState {
  [PING_NS]: PingState;
  [USER_NS]: UserState;
  [MESSAGES_NS]: MessagesState;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
}

export interface Message {
  email: string;
  username: string;
  avatar: string;
  id: string;
  message: string;
}
