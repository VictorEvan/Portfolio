import React from 'react';
import ReactDOM from 'react-dom'; 
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom'; 
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Route render={props => (
      <App {...props} />
    )}/>
  </BrowserRouter>
, document.querySelector('[react-js="root"]'));

registerServiceWorker();
