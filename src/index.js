import React from 'react';
import ReactDOM from 'react-dom'; 
import App from './App';
import { Route, BrowserRouter } from 'react-router-dom'; 
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Route render={props => (
      <App {...props} />
    )}/>
  </BrowserRouter>
, document.querySelector('[react-js="root"]'));

registerServiceWorker();
