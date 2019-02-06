import React, { Component } from 'react';
import './App.css';
import Counter from './components/Counter';

class App extends Component {
  render() {
    const { store } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <Counter
            value={store.getState()}
            onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
            onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
          />,
        </header>
      </div>
    );
  }
}

export default App;
