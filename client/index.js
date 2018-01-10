import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {combineReducers, applyMiddleware} from 'redux'
import createHistory from 'history/createBrowserHistory'
import {routerReducer, ConnectedRouter, routerMiddleware} from 'react-router-redux'
import {Switch} from 'react-router'
import thunk from 'redux-thunk'
import routes from './routes'
import configureStore from './store'
import {renderRoutes } from 'react-router-config'
import App from './containers/app'
import {AppContainer} from 'react-hot-loader'

const history = createHistory();
const store = configureStore(combineReducers({
  routing: routerReducer
}), window.__INITIAL_STATE__, applyMiddleware(...[
  thunk,
  routerMiddleware(history)
]));

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <App/>
                </ConnectedRouter>
            </Provider>
        </AppContainer>, document.getElementById('root'));
};

// if (module.hot) {
//     console.log('in')
//     module.hot.accept('./containers/app', () => {
//         render();
//     });
// }
render();
