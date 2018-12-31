import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './components/app/App.jsx';
import history from './components/app/history.js';
import '!style-loader!css-loader!~bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Router history={history}>
    <App history={history} />
  </Router>,
  document.getElementById('app')
);
