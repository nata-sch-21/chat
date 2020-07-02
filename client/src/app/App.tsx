import React from 'react';
import { hot } from 'react-hot-loader';
import Ping from './components/Ping';

import './styles/index.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
      <Ping />
    </div>
  );
};

export default hot(module)(App);
