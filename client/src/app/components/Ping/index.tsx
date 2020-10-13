import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPing } from '../../actions';
import { selectPingData, selectPingLoading } from '../../reducers/ping';

const url = 'ws://' + window.location.host + '/ws';
const ws = new WebSocket(url);

ws.onopen = function () {
  console.log('Opening a connection...');
};
ws.onclose = function (evt) {
  console.log("I'm sorry. Bye!");
};
ws.onerror = function (evt) {
  console.log('ERR: ');
};
ws.onmessage = (msg) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  console.log(JSON.parse(msg.data));
};

const Ping: React.FC = () => {
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

  return (
    <div>
      <button id="send" className="btn" onClick={onClick}>
        Send
      </button>
      <div>{loading ? 'Loading ...' : `Ping ${ping}`}</div>
    </div>
  );
};

export default Ping;
