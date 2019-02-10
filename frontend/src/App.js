import React, { Component } from 'react';
import './App.css';
import Counter from './components/Counter';
import Winners from './components/Winners';
import io from 'socket.io-client';

const API_URL = process.env.API_URL || "http://localhost:8000";

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = io.connect(API_URL);
    this.state = {
      message: 'Welcome to Button game!'
    }
    const { store, winner_store } = this.props;
    this.socket.on('clicksleft', (input) => {
      store.dispatch({ type: 'UPDATE', value: input.counter, });
    });
    this.socket.on('list_reward', (input) => {
      console.log(input);
      winner_store.dispatch({ type: 'ADD_WINNER', ip: input.ip, ts: input.ts, })
    });
    this.socket.on('reward', (input) => {
      this.setState({
        message: input.reward,
      })
    });
  }

  render() {
    const { store, winner_store } = this.props;
    const { message } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-container">
            <div className='winners'>
              <Winners winners={winner_store.getState()}/>
            </div>
            <div className="game-container">
              <Counter
                value={store.getState()}
                onIncrement={() => {
                  // store.dispatch({ type: 'INCREMENT' })
                  this.socket.emit('increment');
                }}
              />
              {message}
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
