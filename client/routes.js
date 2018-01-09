import React from 'react'
import Home from './pages/home'
import About from './pages/about'
import App from './containers/app'

const routes = [
  {
    component: App,
    routes: [{
            path: '/',
            exact: true,
            component: Home
    }, {
            path: '/about',
            exact: true,
            component: About
    }]
  }
]
export default routes;
