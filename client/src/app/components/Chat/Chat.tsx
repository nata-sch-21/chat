import React, { useState } from 'react';

import { Message } from '../../types';
import { ChatHeader } from '../ChatHeader';

import './Chat.scss';

export const Chat: React.FC = () => {
  const msg = [
    {
      id: 'sdsds',
      message: 'My message',
      username: 'developer',
      email: 'developer@gmail.com',
      avatar: 'https://facebook.github.io/react/img/logo_og.png',
    },
    {
      id: 'adsad',
      message: 'not my message',
      username: 'not_developer',
      email: 'not_developer@gmail.com',
      avatar: 'https://facebook.github.io/react/img/logo_og.png',
    },
  ];

  const [messages] = useState<Message[]>(msg);
  console.log(messages);
  return (
    <div className="App">
      <div className="container">
        <ChatHeader />
        <div className="chatbox">
          {/*<div className="chatbox__user-list">*/}
          {/*  <h1>User list</h1>*/}
          {/*  <div className="chatbox__user--active">*/}
          {/*    <p>Jack Thomson</p>*/}
          {/*  </div>*/}
          {/*  <div className="chatbox__user--busy">*/}
          {/*    <p>Angelina Jolie</p>*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div className="chatbox__messages">
            <div className="chatbox__messages__user-message">
              <div className="chatbox__messages__user-message--ind-message">
                <p className="name">name</p>
                <br />
                <p className="message">text</p>
              </div>
            </div>
          </div>
          <form>
            <input type="text" placeholder="Enter your message" />
          </form>
        </div>
      </div>
    </div>
  );
};
