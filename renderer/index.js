import Koa from 'koa';
import path from 'path';
import webpack from 'webpack'
// import webpackDevMiddleware from 'koa-2-webpack-dev-middleware'
// import webpackConfig from '../webpack/client.config.babel'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {Provider} from 'react-redux'
import {routerReducer} from 'react-router-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {StaticRouter} from 'react-router'
import { matchRoutes, renderRoutes } from 'react-router-config'
import {configureStore} from '../client/store'
import views from 'koa-views'
import routes from '../client/routes'
import thunk from 'redux-thunk'
import App from '../client/containers/app'

const app = new Koa;
app.use(views(path.join(__dirname, '../client'), {
    map: {
        html: 'lodash'
    }
}));
app.use(async (ctx) => {
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
                {renderRoutes(routes)}
            </StaticRouter>
        </Provider>
    );
    console.log(context);
    await ctx.render('index', {title: 'Express', data: store.getState(), content });
});
app.listen(3000)
