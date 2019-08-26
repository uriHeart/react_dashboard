import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css'

import {createStore} from 'redux'
import opener from './reducers/Reducers';
import {Provider} from 'react-redux';
import {CookiesProvider} from 'react-cookie';

const store = createStore(opener);

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <App/>
    </Provider>
  </CookiesProvider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

