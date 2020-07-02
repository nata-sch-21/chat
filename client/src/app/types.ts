import { PingState, PING_NS } from './reducers/ping';

export interface GlobalState {
  [PING_NS]: PingState;
}
