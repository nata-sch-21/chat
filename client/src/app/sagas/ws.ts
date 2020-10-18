import { take, call, apply, takeLatest } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { sendMessage } from '../actions';

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
        console.log('----msg', msg);
        emit({ type: 'LALA', payload: msg });
        // const { payload: book } = msg;
        // const channel = msg.channel;
        // switch (channel) {
        //   case 'ADD_BOOK':
        //     return emitter({ type: ADD_BOOK, book })
        //   case 'REMOVE_BOOK':
        //     return emitter({ type: REMOVE_BOOK, book })
        //   default:
        //   // nothing to do
        // }
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
      console.log('payload', payload);
      // yield put({ type: 'INCOMING_PONG_PAYLOAD', payload });
      // yield fork(pong, ws);
    } catch (err) {
      console.error('socket error:', err);
      // socketChannel is still open in catch block
      // if we want end the socketChannel, we need close it explicitly
      socketChannel.close();
    }
  }
}

function* runSendMessage(socket: WebSocket) {
  try {
    // yield delay(5000);
    const data = JSON.stringify({
      username: '-----WS-----USER',
      message: 'content',
    });

    yield apply(socket, socket.send, [data]); // call `emit` as a method with `socket` as context
  } catch (error) {
    socket.close();
  }
}

export function* handleEmitMessage(socket: WebSocket) {
  yield takeLatest(sendMessage, runSendMessage, socket);
}
