import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from './reducer'
import {composeWithDevTools} from "redux-devtools-extension";


const enhancer = composeWithDevTools(applyMiddleware(thunk, logger))


export default () => {
  const store = createStore(reducer, enhancer)

  return store;
};
