import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import App from './components/App.jsx';
import history from './components/history.js';

ReactDOM.render(
    <CookiesProvider>
      <Router history={history}>
        <App history={history} />
      </Router>
    </CookiesProvider>,
  document.getElementById('app')
);
