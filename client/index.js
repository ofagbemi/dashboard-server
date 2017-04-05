import 'babel-core/register'
import 'babel-polyfill'

import ReactDOM from 'react-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, autoRehydrate } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'
import localForage from 'localforage'

import reducer from './redux'
import saga from './saga'
import Routes from './Routes'
import App from './App'


const sagaMiddleware = createSagaMiddleware()
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
/* eslint-enable */
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware),
    autoRehydrate()
  )
)

sagaMiddleware.run(saga)
persistStore(store, {
  storage: localForage,
  transforms: [immutableTransform()],
})

ReactDOM.render(
  <Provider store={store}>
    <App>
      <Routes />
    </App>
  </Provider>,
  document.getElementById('react-root')
)
