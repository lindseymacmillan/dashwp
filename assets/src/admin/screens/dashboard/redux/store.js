import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './reducers/index'

import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger()

//STORE

const initialState = {};

export const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)