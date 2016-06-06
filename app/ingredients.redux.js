export const LOAD_INGREDIENTS = 'ingredients/LOAD'
export const CREATE_INGREDIENT = 'ingredients/CREATE'

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

export function loadIngredients() {
  return dispatch => {
    dispatch({ type: LOAD_INGREDIENTS })

    try {
      return fetch('http://localhost:3002/ingredients')
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
          console.log('request succeeded with JSON response', data)
          dispatch({
            type: `${LOAD_INGREDIENTS}_SUCCESS`,
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

export function create(ingredient) {
  return dispatch => {
    dispatch({ type: CREATE_INGREDIENT })

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

export default function (state = {}, action) {
  switch (action.type) {
    case `${LOAD_INGREDIENTS}_SUCCESS`:
      return Object.assign({}, state, {
        list: action.result,
        loaded: true
      })
    case `${CREATE_INGREDIENT}_SUCCESS`:
      if (state.loaded) {
        return Object.assign({}, state, {
          list: [...state.list, action.created]
        })
      }
      return state
    default:
      return state
  }
}
