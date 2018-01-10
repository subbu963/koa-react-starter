import React from 'react'
import Home from './pages/home'
import About from './pages/about'
import App from './containers/app'

const routes = [
  {
    component: Home,
    exact: true,
    routes: [{
            path: '/about',
            exact: true,
            component: About
    }]
  }
]
export default routes;
