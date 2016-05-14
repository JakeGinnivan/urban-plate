import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as reduxAsyncConnect } from 'redux-connect'
import ingredients from './pages/ingredients/ingredients.redux'

// Main reducer
const appReducer = (state = {}) => state

const reducers = combineReducers({
  routing: routerReducer,
  app: appReducer,
  form: formReducer,
  reduxAsyncConnect,
  ingredients
})
export default reducers
