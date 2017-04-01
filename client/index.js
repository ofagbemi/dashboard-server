import ReactDOM from 'react-dom'
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'

import reducer from './redux'
import Routes from './Routes'
import App from './App'

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
/* eslint-enable */
const store = createStore(reducer, composeEnhancers())

ReactDOM.render(
  <Provider store={store}>
    <App>
      <Routes />
    </App>
  </Provider>,
  document.getElementById('react-root')
)
