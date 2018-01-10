import Koa from 'koa'
import path from 'path'
import webpack from 'webpack'
import koaWebpackMiddleware from 'koa-webpack'
import webpackConfig from '../webpack/client.config.babel'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {Provider} from 'react-redux'
import {routerReducer} from 'react-router-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {StaticRouter} from 'react-router'
import {matchRoutes, renderRoutes } from 'react-router-config'
import thunk from 'redux-thunk'
import Helmet from 'react-helmet'
import html from './containers/html'
import routes from '../client/routes'
import {configureStore} from '../client/store'
import App from '../client/containers/app'

const app = new Koa;

app.use(koaWebpackMiddleware({
    compiler: webpack(webpackConfig),
    dev: {
        serverSideRender: true,
        hot: true
    }
}));

app.use(async (ctx) => {
    const stats = ctx.state.webpackStats.toJson();
    const store = createStore(combineReducers({
        routing: routerReducer
    }), applyMiddleware(thunk));
    const branch = matchRoutes(routes, ctx.url);
    const promises = branch.map(({route}) => {
        const fetchData = route.component.fetchData;
        return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null)
    });
    await Promise.all(promises);
    let context = {};
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={ctx.url} context={context}>
                <App/>
            </StaticRouter>
        </Provider>
    );
    const helmet = Helmet.renderStatic();
    ctx.body = html(helmet, stats, store.getState(), content);
});
app.listen(3000)
