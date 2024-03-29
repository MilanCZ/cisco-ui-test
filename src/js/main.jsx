import React from 'react'
import ReactDOM from 'react-dom'

import routes from './routes'
import Root from './Root'
import configureStore from './redux/configureStore'
import { history } from './app-history'

let initialState = {}

// rehydrate initialState for JS app
if (window.__INITIAL_STATE__) {
  initialState = window.__INITIAL_STATE__
}

const store = configureStore(initialState, history)

// Render the React application to the DOM
// Root component is to bootstrap Provider, Router and DevTools
ReactDOM.render(
  <Root history={history} routes={routes} store={store}/>,
  document.getElementById('app-container'),
)
