import React from 'react';
import ReactDOM from 'react-dom'; 
import App from './App';
import { Route, HashRouter } from 'react-router-dom'; 
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <HashRouter>
    <Route render={props => (
      <App {...props} />
    )}/>
  </HashRouter>
, document.querySelector('[react-js="root"]'));

registerServiceWorker();
