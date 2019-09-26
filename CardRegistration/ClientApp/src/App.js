import React, { Component } from 'react';
import { CardRegister } from './components/CardRegister';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
        <div>
            <CardRegister/>
      </div>
    );
  }
}
