import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import * as Sentry from '@sentry/browser';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import history from './history';
import reducer from './Store/reducers/rootReducers';
import * as serviceWorker from './serviceWorker';
import 'fawn-components/lib/fn-pwa-banner';
import 'fawn-components/lib/fn-pwa-status';

// for crash report using sentry
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn:
      'https://b4f289a04be74ee48871e66af6cbc0ff@o400302.ingest.sentry.io/5258603',
  });
}

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const rootElement = document.getElementById('root');
render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  rootElement,
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
