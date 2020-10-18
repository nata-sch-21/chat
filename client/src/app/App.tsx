import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { Chat } from './components/Chat';
import { Ping } from './components/Ping';

import './styles/index.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Chat />
          </Route>
          <Route exact path="/ping">
            <Ping />
          </Route>
          <Route exact path="/404">
            <div>404</div>
          </Route>
          <Redirect to="/404" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default hot(module)(App);
