export const LOG_IN = 'admin/LOG_IN'
export const LOG_OUT = 'admin/LOG_OUT'

export function logIn() {
  return { type: LOG_IN, payload: {} }
}

export function logOut() {
  return { type: LOG_OUT, payload: {} }
}

export default function (state = { loggedIn: false }, action) {
  switch (action.type) {
    case `${LOG_IN}`:
      return Object.assign({}, state, {
        token: action.payload.token,
        loggedIn: true
      })
    case `${LOG_OUT}`:
      return Object.assign({}, state, {
        token: action.payload.token,
        loggedIn: false
      })
    default:
      return state
  }
}
