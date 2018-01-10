import React, {Component} from 'react'
import {renderRoutes } from 'react-router-config'
import routes from '../routes'

export default function App({children}) {
    return (
        <div>
            {renderRoutes(routes)}
        </div>
    );
};
