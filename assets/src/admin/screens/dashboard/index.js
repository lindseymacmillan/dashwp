import React from 'react'
import ReactDOM from 'react-dom'

import Dashboard from './root/Dashboard.js'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import { store } from './redux/store'

ReactDOM.render(
    <Provider store={store}>
        <Dashboard />
    </Provider>,
    document.getElementById('root')
);