import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

import {Provider} from 'react-redux';
import store from './redux/store';

import App from './App';

// eslint-disable-next-line no-undef
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  // eslint-disable-next-line no-undef
  document.getElementById('root')
);
