import { combineReducers } from 'redux'

import { interfaceReducer } from './interfaceReducer'
import { generalReducer } from './generalReducer'
import { dashboardsReducer } from './dashboardsReducer'
import { postTypesReducer } from './postTypesReducer'
import { contributorsReducer } from './contributorsReducer'

export const rootReducer = combineReducers({ 
  interface: interfaceReducer,
  general: generalReducer,
  dashboards: dashboardsReducer,
  postTypes: postTypesReducer,
  contributors: contributorsReducer,
})