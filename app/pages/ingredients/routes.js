import * as React from 'react'
import { Route, IndexRoute } from 'react-router'
import Index from './index'
import New from './new'
import IngredientsContainer from './ingredients-container'

export default (
  <Route path='/ingredients' component={IngredientsContainer}>
    <IndexRoute component={Index} />
    <Route path='new' component={New} />
  </Route>
)
