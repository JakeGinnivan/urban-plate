import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

// Main reducer
const appReducer = (state = {}) => state

const reducers = combineReducers({
  routing: routerReducer,
  app: appReducer,
  form: formReducer
})
export default reducers
