import { createAsyncAction } from 'typesafe-actions';
// import { createAsyncAction, createStandardAction } from 'typesafe-actions';

interface PingPayload {
  data: string;
}

export const loadPing = createAsyncAction('LOAD_PING_REQUEST', 'LOAD_PING_SUCCESS', 'LOAD_PING_FAILURE')<
  undefined,
  PingPayload,
  string
>();
