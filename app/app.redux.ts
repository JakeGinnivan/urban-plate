import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as reduxAsyncConnect } from 'redux-connect'
import { reducer as notifications } from 'react-redux-notifications'
import ingredients from './ingredients.redux'
import admin from './pages/admin/admin.redux'
import { Dispatch } from 'app.d'
import {actionCreator, isType, createNewState, Action} from 'helpers/redux'

export interface IAppState {
  currentRecipe?: IRecipe
  recipes?: IRecipe[]
  recipesLoaded?: boolean
  units?: IUnit[]
  unitsLoaded?: boolean
  difficulties?: IDifficulty[]
  difficultiesLoaded?: boolean
}

const LOAD_UNITS = actionCreator<void, IUnit[], void>('LOAD_UNITS')
const LOAD_RECIPES = actionCreator<void, IRecipe[], void>('LOAD_RECIPES')
const LOAD_RECIPE = actionCreator<number, IRecipe, void>('LOAD_RECIPE')
const LOAD_DIFFICULTIES = actionCreator<void, IDifficulty[], void>('LOAD_DIFFICULTIES')
const CREATE_RECIPE = actionCreator<IRecipe, IRecipe, void>('CREATE_RECIPE')

function checkStatus(response: IResponse) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  throw new Error(response.statusText)
}

function parseJSON(response: IResponse) {
  return response.json()
}

export function loadRecipes() {
  return (dispatch: Dispatch) => {
    dispatch(LOAD_RECIPES())

    try {
      return fetch('http://localhost:3002/recipes')
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
          dispatch(LOAD_RECIPES.success(data))
        }).catch((error) => {
          console.log('request failed', error)
        })
    } catch (err) {
      console.log('Error', err)
    }
  }
}

export function loadRecipe(id: number) {
  return (dispatch: Dispatch) => {
    dispatch(LOAD_RECIPE(id))

    try {
      return fetch(`http://localhost:3002/recipes/${id}`)
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
          dispatch(LOAD_RECIPE.success(data))
        }).catch((error) => {
          console.log('request failed', error)
        })
    } catch (err) {
      console.log('Error', err)
    }
  }
}

export function loadUnits() {
  return (dispatch: Dispatch) => {
    dispatch(LOAD_UNITS())

    try {
      return fetch('http://localhost:3002/units')
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
          dispatch(LOAD_UNITS.success(data))
        }).catch((error) => {
          console.log('request failed', error)
        })
    } catch (err) {
      console.log('Error', err)
    }
  }
}
export function loadDifficulties() {
  return (dispatch: Dispatch) => {
    dispatch(LOAD_DIFFICULTIES())

    try {
      return fetch('http://localhost:3002/difficulties')
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
          dispatch(LOAD_DIFFICULTIES.success(data))
        }).catch((error) => {
          console.log('request failed', error)
        })
    } catch (err) {
      console.log('Error', err)
    }
  }
}


export function createRecipe(recipe: IRecipe) {
  return (dispatch: Dispatch) => {
    dispatch(CREATE_RECIPE(recipe))

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
          dispatch(CREATE_RECIPE.success({ recipe, response }))
        }).catch((error) => {
          console.log('request failed', error)
        })
    } catch (err) {
      console.log('Error', err)
    }
  }
}

const appReducer = (state: IAppState = {}, action: Action<any, any>): IAppState => {
  if (isType.success(action, LOAD_UNITS)) {
    return createNewState(state, {
        units: action.payload,
        unitsLoaded: true
      })
  } else if (isType.success(action, LOAD_RECIPES)) {
    return createNewState(state, {
      recipes: action.payload,
      recipesLoaded: true
    })
  } else if (isType.success(action, LOAD_RECIPE)) {
    return createNewState(state, {
      currentRecipe: action.payload
    })
  } else if (isType.success(action, LOAD_DIFFICULTIES)) {
    return createNewState(state, {
      difficulties: action.payload,
      difficultiesLoaded: true
    })
  }
  return state
}

const reducers = combineReducers({
  routing: routerReducer,
  app: appReducer,
  form: formReducer,
  reduxAsyncConnect,
  ingredients,
  notifications,
  admin
})
export default reducers
