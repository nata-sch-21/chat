import { PingState, PING_NS } from './reducers/ping';
import { UserState, USER_NS } from './reducers/user';

export interface GlobalState {
  [PING_NS]: PingState;
  [USER_NS]: UserState;
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
