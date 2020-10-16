import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPing, emitMessage } from '../../actions';
import { selectPingData, selectPingLoading } from '../../reducers/ping';

const url = 'wss://' + window.location.host + '/ws';
// const url = 'ws://localhost:8080/ws';
const ws: WebSocket = new WebSocket(url);

ws.onopen = function () {
  console.log('Opening a connection...');
};
ws.onclose = function () {
  console.log("I'm sorry. Bye!");
};
ws.onerror = function () {
  console.log('ERR: ');
};

export const Ping: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectPingLoading);
  const ping = useSelector(selectPingData);

  useEffect(() => {
    dispatch(loadPing.request());
  }, [dispatch]);

  const onClick = () => {
    const message = {
      username: 'user',
      message: 'content',
    };

    ws.send(JSON.stringify(message));
  };
  const onClick2 = () => {
    dispatch(emitMessage());
  };

  return (
    <div>
      <button id="send" className="btn" onClick={onClick}>
        Send
      </button>
      <button id="send" className="btn" onClick={onClick2}>
        Send2
      </button>
      <div>{loading ? 'Loading ...' : `Ping ${ping}`}</div>
    </div>
  );
};
