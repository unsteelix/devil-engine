import { combineReducers } from 'redux'
import { queryReducer } from './query'
import { cardReducer } from './card'
import { authReducer } from './auth'

export const rootReducer = combineReducers({
  query: queryReducer,
  card: cardReducer,
  account: authReducer
})