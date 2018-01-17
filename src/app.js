import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './redux/configureStore';
import Layout from "./components/Layout";


const store = configureStore();

window.store = store;

const jsx = (
  <Provider  store={store}>
    <Layout/>
  </Provider>
);


ReactDOM.render(jsx, document.getElementById('app'));

