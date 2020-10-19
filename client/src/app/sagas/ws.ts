import { take, call, apply, takeLatest, put } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { ActionType } from 'typesafe-actions';

import { sendMessage, setMessage } from '../actions';

function initWebsocket(ws: WebSocket) {
  return eventChannel((emit) => {
    ws.onopen = () => {
      console.log('opening...');
    };
    ws.onerror = (error) => {
      console.log('WebSocket error ' + error);
      console.dir(error);
    };
    ws.onmessage = (e) => {
      let msg = null;
      try {
        msg = JSON.parse(e.data);
      } catch (e) {
        console.error(`Error parsing : ${e.data}`);
      }

      if (msg) {
        emit(msg);
      }
    };
    // unsubscribe function
    return () => {
      console.log('Socket off');
    };
  });
}

export function* handleEvent(socket: WebSocket) {
  const socketChannel = yield call(initWebsocket, socket);

  while (true) {
    try {
      // An error from socketChannel will cause the saga jump to the catch block
      const payload = yield take(socketChannel);
      yield put(setMessage(payload));
    } catch (err) {
      console.error('socket error:', err);
      // socketChannel is still open in catch block
      // if we want end the socketChannel, we need close it explicitly
      socketChannel.close();
    }
  }
}

function* runSendMessage(
  socket: WebSocket,
  { payload }: ActionType<typeof sendMessage>,
) {
  try {
    const data = JSON.stringify(payload);

    yield apply(socket, socket.send, [data]); // call `emit` as a method with `socket` as context
  } catch (error) {
    socket.close();
  }
}

export function* handleEmitMessage(socket: WebSocket) {
  yield takeLatest(sendMessage, runSendMessage, socket);
}
