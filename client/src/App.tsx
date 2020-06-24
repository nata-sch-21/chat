import React from 'react';
import { GoogleLogin } from 'react-google-login';

import logo from './logo.svg';
import './App.css';
import PingComponent from './PingComponent';

const App: React.FC = () => {
  const clientId: string = process.env.REACT_APP_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID || '';
  console.log(clientId);
  console.log(process.env);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <PingComponent />
      </header>
      <GoogleLogin
        clientId={clientId}
        onSuccess={(response): void => {
          if ('profileObj' in response) {
            console.log(response.profileObj);
          }
        }}
        onFailure={(res): void => console.log(res)}
        isSignedIn={true}
      />
    </div>
  );
};

export default App;
