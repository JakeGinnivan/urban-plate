import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as reduxAsyncConnect } from 'redux-connect'
import ingredients from './ingredients.redux'
import _ from 'lodash'

export const LOAD_UNITS = 'app/LOAD_UNITS'
export const LOAD_DIFFICULTIES = 'app/LOAD_DIFFICULTIES'
export const CREATE_RECIPE = 'app/CREATE_RECIPE'
export const LOAD_RECIPES = 'app/LOAD_RECIPES'
export const LOAD_RECIPE = 'app/LOAD_RECIPE'

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

export function loadRecipes() {
  return dispatch => {
    dispatch({ type: LOAD_RECIPES })

    try {
      return fetch('http://localhost:3002/recipes')
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
          dispatch({
            type: `${LOAD_RECIPES}_SUCCESS`,
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

export function loadRecipe(id) {
  return dispatch => {
    dispatch({ type: LOAD_RECIPE })

    try {
      return fetch(`http://localhost:3002/recipes/${id}`)
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
          dispatch({
            type: `${LOAD_RECIPE}_SUCCESS`,
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

export function loadUnits() {
  return dispatch => {
    dispatch({ type: LOAD_UNITS })

    try {
      return fetch('http://localhost:3002/units')
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
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
export function loadDifficulties() {
  return dispatch => {
    dispatch({ type: LOAD_DIFFICULTIES })

    try {
      return fetch('http://localhost:3002/difficulties')
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
          dispatch({
            type: `${LOAD_DIFFICULTIES}_SUCCESS`,
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


export function createRecipe(recipe) {
  return dispatch => {
    dispatch({ type: CREATE_RECIPE })

    try {
      return fetch('http://localhost:3002/recipes', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
      })
        .then(checkStatus)
        .then(parseJSON)
        .then((response) => {
          dispatch({
            type: `${CREATE_RECIPE}_SUCCESS`,
            created: response
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
    case `${LOAD_RECIPES}_SUCCESS`:
      return Object.assign({}, state, {
        recipes: action.result,
        recipesLoaded: true
      })
    case `${LOAD_RECIPE}_SUCCESS`:
      return Object.assign({}, state, {
        currentRecipe: action.result
      })
    case `${LOAD_DIFFICULTIES}_SUCCESS`:
      return Object.assign({}, state, {
        difficulties: action.result,
        difficultiesLoaded: true
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
