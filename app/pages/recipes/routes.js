import React from 'react'
import { Route, IndexRoute } from 'react-router'
import RecipeContainer from './recipe-container'
import Index from './index'
import New from './new'
import View from './view'

export default (
  <Route path='/recipes' component={RecipeContainer}>
    <IndexRoute component={Index} />
    <Route path='new' component={New} />
    <Route path=':id' component={View} />
  </Route>
)
