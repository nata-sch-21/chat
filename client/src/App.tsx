import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';
import PingComponent from './PingComponent';

const App: React.FC = () => {
  const [config, setConfig] = useState<{ [key: string]: string } | null>(null);

  useEffect(() => {
    axios
      .get('api/config')
      .then((response) => {
        setConfig(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (!config) {
    return <div className="App">Getting configs</div>;
  }

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
        clientId="132320294276-086d3v5np79k30cgd8j23ca22avssfkn.apps.googleusercontent.com"
        onSuccess={(response): void => {
          console.log(response);
          if ('profileObj' in response) {
            console.log(response.profileObj);
          }
        }}
        onFailure={(res): void => console.log(res)}
      />
    </div>
  );
};

export default App;
