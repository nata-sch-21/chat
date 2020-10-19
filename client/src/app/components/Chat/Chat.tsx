import React, { KeyboardEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uid from 'uid';

import { Message } from '../../types';
import { ChatHeader } from '../ChatHeader';
import { selectUser } from '../../reducers/user';
import { selectMessages } from '../../reducers/messages';
import { sendMessage } from '../../actions';

import './Chat.scss';

export const Chat: React.FC = () => {
  const user = useSelector(selectUser);
  const messages = useSelector(selectMessages);

  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  if (!user) {
    return null;
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current?.value) {
      const message: Message = {
        id: uid(),
        email: user.email,
        avatar: user.avatar,
        message: inputRef.current.value,
        username: user.username,
      };

      dispatch(sendMessage(message));
      inputRef.current.value = '';
    }
  };

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
          <div className="chatbox__messages__container">
            {messages &&
              messages.map((message) => (
                <div className="chatbox__messages" key={message.id}>
                  <div className="chatbox__messages__user-message">
                    <div
                      className={`chatbox__messages__user-message--ind-message${
                        message.email === user?.email ? '--owner' : ''
                      }`}
                    >
                      <p className="name">{message.username}</p>
                      <br />
                      <p className="message">{message.message}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter your message"
            onKeyDown={onKeyDown}
          />
        </div>
      </div>
    </div>
  );
};
