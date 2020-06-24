import React, { Component, ReactNode } from 'react';
import axios from 'axios';

class PingComponent extends Component {
  state = {
    pong: 'pending',
  };

  componentDidMount() {
    axios
      .get('api/ping')
      .then((response) => {
        this.setState(() => {
          return { pong: response.data.message };
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render(): ReactNode {
    return <h1>Ping {this.state.pong}</h1>;
  }
}

export default PingComponent;
