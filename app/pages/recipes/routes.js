import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Index from './index'
import New from './new'
import RecipeContainer from './recipe-container'

export default (
  <Route path='/recipes' component={RecipeContainer}>
    <IndexRoute component={Index} />
    <Route path='new' component={New} />
  </Route>
)
