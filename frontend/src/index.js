import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import counter from './reducers/counter';
import winners from './reducers/winners';

const store = createStore(counter);
const winner_store = createStore(winners);
const rootEl = document.getElementById('root');
const render = () => ReactDOM.render(
  <App store={store} winner_store={winner_store} />,
  rootEl);
render()
store.subscribe(render);

serviceWorker.unregister();
