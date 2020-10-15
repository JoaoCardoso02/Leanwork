import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/Home/index.jsx';

import { Provider } from 'react-redux';
import store from './store/index.js';

import './assets/css/global.scss';

ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('root')
);