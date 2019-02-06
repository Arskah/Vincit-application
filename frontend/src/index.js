import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import counter from './reducers';

const store = createStore(counter);
const rootEl = document.getElementById('root');
const render = () => ReactDOM.render(
  <App store={store} />,
  rootEl);
render()
store.subscribe(render);

serviceWorker.unregister();
