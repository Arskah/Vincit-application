import React, { Component } from 'react';
import './App.css';
import Counter from './components/Counter';
import Winners from './components/Winners';
import io from 'socket.io-client';

const API_URL = process.env.API_URL || "http://localhost:8000";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io.connect(API_URL),
      
    }
    const { store, winner_store } = this.props;
    this.state.socket.on('update', (input) => {
      store.dispatch({ type: 'UPDATE', value: input.counter, });
    });
    this.state.socket.on('list_reward', (input) => {
      winner_store.dispatch({ type: 'ADD_WINNER', ip: input.ip, ts: input.ts, })
    });
    this.state.socket.on('reward', (input) => {
      // TODO: Print to user
      console.log(input.reward);
    });
  }

  render() {
    const { store, winner_store } = this.props;
    const { socket } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <Winners winners={winner_store.getState()}/>
          <Counter
            value={store.getState()}
            onIncrement={() => {
              // store.dispatch({ type: 'INCREMENT' })
              socket.emit('increment');
            }}
          />
        </header>
      </div>
    );
  }
}

export default App;
