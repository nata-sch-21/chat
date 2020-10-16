import React from 'react';

import { Ping } from '../Ping';

export const Chat: React.FC = () => {
  // const messagessss = [
  //   {
  //     id: 1,
  //     text: 'My message',
  //     createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
  //     user: {
  //       id: 1,
  //       name: 'Me',
  //       avatar: 'https://facebook.github.io/react/img/logo_og.png',
  //     },
  //     image: 'https://facebook.github.io/react/img/logo_og.png',
  //     // Any additional custom parameters are passed through
  //   },
  //   {
  //     id: 3,
  //     text: 'Hello developer',
  //     createdAt: new Date(),
  //     user: {
  //       id: 3,
  //       name: 'React',
  //       avatar: 'https://facebook.github.io/react/img/logo_og.png',
  //     },
  //   },
  // ];
  //
  // const [messages, setMessages] = useState(messagessss);

  return (
    <div className="App">
      <div className="Chat"></div>

      <Ping />
      <div>
        <img src="logo192.png" alt="" />
      </div>
    </div>
  );
};
