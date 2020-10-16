import { spawn, all } from 'redux-saga/effects';

import { handleFetchPing } from './ping';
import { handleEvent, handleEmitMessage } from './ws';

export function* rootSaga({ socket }: { socket: WebSocket }) {
  yield all([
    spawn(handleFetchPing),
    spawn(handleEvent, socket),
    spawn(handleEmitMessage, socket),
  ]);
}
