import React from 'react'
import AppContainer from './pages/app-container'
import Home from './pages/home'
import NotFound from './pages/404'
import About from './pages/about'
import RecipeRoutes from './pages/recipes/routes'
import { Route, IndexRoute } from 'react-router'

export default (
  <Route path='/' component={AppContainer}>
    { /* Home (main) route */ }
    <IndexRoute component={Home} />

    { /* Routes */ }
    <Route path='about' component={About} />

    {RecipeRoutes}

    { /* Catch all route */ }
    <Route path='*' component={NotFound} status={404} />
  </Route>
)
