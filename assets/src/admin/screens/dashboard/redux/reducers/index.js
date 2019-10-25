import { combineReducers } from 'redux'

import { interfaceReducer } from './interfaceReducer'
import { queryReducer } from './queryReducer'

export const rootReducer = combineReducers({ 
  interface: interfaceReducer,
  query: queryReducer 
})
