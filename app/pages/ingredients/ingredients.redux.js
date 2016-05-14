export const LOAD_INGREDIENTS = 'ingredients/LOAD'

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

export default function (state = {}, action) {
  switch (action.type) {
    case `${LOAD_INGREDIENTS}_SUCCESS`:
      return Object.assign({}, state, {
        list: action.result,
        loaded: true
      })
    default:
      return state
  }
}
