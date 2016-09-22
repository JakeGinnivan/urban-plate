import * as React from 'react'
import routes from './routes'
import { Router } from 'react-router'
import { ReduxAsyncConnect } from 'redux-connect'
import './app.scss'
import 'isomorphic-fetch'

const App = ({ history } : { history: any }) => (
  <Router history={history} render={(props) => {
      return <ReduxAsyncConnect {...props} /> as any
    }}>
    {routes}
  </Router>
)

export default App
