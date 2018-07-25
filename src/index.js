import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'
import { Route } from 'react-router-dom'; 
import registerServiceWorker from './registerServiceWorker';
import {AppReducer, initialAppState} from './redux/reducers/app';
import App from './App';

const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  connectRouter(history)(AppReducer), // new root reducer with router state,
  initialAppState,
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
    )
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <Route render={props => (
          <App {...props} />
        )}/>
    </ConnectedRouter>
  </Provider>
, document.querySelector('[react-js="root"]'));

registerServiceWorker();
