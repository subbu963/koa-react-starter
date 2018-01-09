import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import {routerReducer, ConnectedRouter, routerMiddleware} from 'react-router-redux'
import {Switch} from 'react-router'
import thunk from 'redux-thunk'
import routes from './routes'
import configureStore from './store'

const history = createHistory();
const store = configureStore(combineReducers({
  routing: routerReducer
}), window.__initialState__, [
  thunk,
  routerMiddleware(history)
]);


render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <routes/>
        </ConnectedRouter>
    </Provider>, document.getElementById('root'));
