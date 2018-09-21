import React from 'react';
import ReactDOM from 'react-dom'; 
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux/reducers';
import middleware from './redux/middleware';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import historyTracker from './util/historyTracker';
import registerServiceWorker from './registerServiceWorker';

const customHistory = createBrowserHistory({basename: process.env.basename});
const addHistory = historyTracker();
let historyObject = { from: null, to: null };

customHistory.listen((location) => {
  historyObject = addHistory(location);
});

const store = createStore(reducer, middleware);

ReactDOM.render(
  <Provider store={store} >
    <Router history={customHistory} >
      <Route render={(props) => <App {...props} addHistory={addHistory} historyObject={historyObject} />} />
    </Router>
  </Provider>
, document.querySelector('[react-js="root"]'));

registerServiceWorker();
