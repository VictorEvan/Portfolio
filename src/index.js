import React from 'react';
import ReactDOM from 'react-dom'; 
import App from './App';
import { Router, Route } from 'react-router-dom'; 
import registerServiceWorker from './registerServiceWorker';
import { createBrowserHistory } from 'history';
import historyTracker from './helper/historyTracker';

const customHistory = createBrowserHistory({basename: process.env.basename});
const addHistory = historyTracker();
let historyObject = { from: null, to: null };

customHistory.listen((location) => {
  historyObject = addHistory(location);
});

ReactDOM.render(
  <Router history={customHistory} >
    <Route render={(props) => <App {...props} addHistory={addHistory} historyObject={historyObject} />} />
  </Router>
, document.querySelector('[react-js="root"]'));

registerServiceWorker();
