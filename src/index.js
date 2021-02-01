import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import gridReducer from './store/reducers/grid';
import formsReducer from './store/reducers/forms';
import undoEnhancer from './store/enhancers/undoEnhancer';









const rootReducer = combineReducers({
  grid: gridReducer,
  forms: formsReducer
});


const store = createStore(
    rootReducer, 
    composeWithDevTools(
      applyMiddleware(thunk),
      undoEnhancer,
  ));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


