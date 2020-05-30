import React from 'react'
import { hydrate, render } from "react-dom";
import './index.css'
import App from './App'
import * as Sentry from '@sentry/browser';
import * as serviceWorker from './serviceWorker'

// for crash report using sentry
Sentry.init({dsn: "https://b4f289a04be74ee48871e66af6cbc0ff@o400302.ingest.sentry.io/5258603"});

// ReactDOM.render(<App />, document.getElementById('root'))
const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
    hydrate(<App />, rootElement);
} else {
    render(<App />, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()




