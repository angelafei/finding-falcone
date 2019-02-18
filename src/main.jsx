import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Routes } from './routes.jsx';
import { reducers } from './reducer/reducer';
import style from './styles/main.scss';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, composeEnhancer(applyMiddleware(thunk)));

ReactDOM.render((
  <Provider store={store}>
    <Routes />
  </Provider>
), document.getElementById('root'));