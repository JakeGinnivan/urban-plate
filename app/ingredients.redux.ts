import { Dispatch } from 'app.d'
import {actionCreator, isType, createNewState, Action} from 'helpers/redux'

const LOAD_INGREDIENTS = actionCreator<void, IIngredient[], void>('LOAD_INGREDIENTS')
const CREATE_INGREDIENT = actionCreator<void, IIngredient[], void>('CREATE_INGREDIENT')

export interface IIngredientState {
  list?: IIngredient[]
  loaded?: boolean
}

function checkStatus(response: IResponse) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  throw new Error(response.statusText)
}

function parseJSON(response: IResponse) {
  return response.json()
}

export function loadIngredients() {
  return (dispatch: Dispatch) => {
    dispatch(LOAD_INGREDIENTS())

    try {
      return fetch('http://localhost:3002/ingredients')
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
          console.log('request succeeded with JSON response', data)
          dispatch(LOAD_INGREDIENTS.success(data))
        }).catch((error) => {
          console.log('request failed', error)
        })
    } catch (err) {
      console.log('Error', err)
    }
  }
}

export function create(ingredient: IIngredient) {
  return (dispatch: Dispatch) => {
    dispatch(CREATE_INGREDIENT())

    try {
      return fetch('http://localhost:3002/ingredients', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ingredient)
      })
        .then(checkStatus)
        .then(parseJSON)
        .then((response) => {
          console.log('request succeeded with JSON response', response)
          dispatch({
            type: `${CREATE_INGREDIENT}_SUCCESS`,
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

export default function (state: IIngredientState = {}, action: Action<any, any>) {
  if (isType.success(action, LOAD_INGREDIENTS)) {
    return createNewState(state, {
      list: action.payload,
      loaded: true
    })
  } else if (isType.success(action, CREATE_INGREDIENT)) {
    return createNewState(state, {
      list: state.list ? [...state.list, action.payload] : [action.payload]
    })
  }

  return state
}
