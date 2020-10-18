import { createAsyncAction, createAction } from 'typesafe-actions';

export interface PingPayload {
  data: string;
}

export const loadPing = createAsyncAction(
  'LOAD_PING_REQUEST',
  'LOAD_PING_SUCCESS',
  'LOAD_PING_FAILURE',
)<undefined, PingPayload, string>();

export const sendMessage = createAction('EMIT_MESSAGE')();

export interface UserPayload {
  id: string;
  username: string;
  email: string;
  avatar: string;
}

export const setUser = createAction('SET_USER')<UserPayload>();
