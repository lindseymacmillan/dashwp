import React from 'react'
import ReactDOM from 'react-dom'

import Options from './root/Options.js'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import { store } from './redux/store'

ReactDOM.render(
    <Provider store={store}>
        <Options />
    </Provider>,
    document.getElementById('root')
);