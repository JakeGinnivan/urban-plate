import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as reduxAsyncConnect } from 'redux-connect'
import ingredients from './pages/ingredients/ingredients.redux'

export const LOAD_UNITS = 'app/LOAD_UNITS'

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

function parseJSON(response) {
  return response.json()
}

export function loadUnits() {
  return dispatch => {
    dispatch({ type: LOAD_UNITS })

    try {
      return fetch('http://localhost:3002/units')
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
          console.log('request succeeded with JSON response', data)
          dispatch({
            type: `${LOAD_UNITS}_SUCCESS`,
            result: data
          })
        }).catch((error) => {
          console.log('request failed', error)
        })
    } catch (err) {
      console.log('Error', err)
    }
  }
}

const appReducer = (state = {}, action) => {
  switch (action.type) {
    case `${LOAD_UNITS}_SUCCESS`:
      return Object.assign({}, state, {
        units: action.result,
        unitsLoaded: true
      })
    default:
      return state
  }
}

const reducers = combineReducers({
  routing: routerReducer,
  app: appReducer,
  form: formReducer,
  reduxAsyncConnect,
  ingredients
})
export default reducers
