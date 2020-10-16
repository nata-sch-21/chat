import { createAsyncAction, createAction } from 'typesafe-actions';

interface PingPayload {
  data: string;
}

export const loadPing = createAsyncAction(
  'LOAD_PING_REQUEST',
  'LOAD_PING_SUCCESS',
  'LOAD_PING_FAILURE',
)<undefined, PingPayload, string>();

export const emitMessage = createAction('EMIT_MESSAGE')();
