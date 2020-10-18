import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../reducers/user';

import './ChatHeader.scss';

export const ChatHeader: React.FC = () => {
  const user = useSelector(selectUser);

  return (
    <div className="header">
      <div className="header__avatar">
        <img src={user?.avatar} alt="" />
      </div>
      <div className="header__name">{user?.username}</div>
      <div className="header__email">{user?.email}</div>
    </div>
  );
};
