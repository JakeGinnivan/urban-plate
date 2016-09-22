import * as React from 'react'
import AppContainer from './pages/app-container'
import Home from './pages/home'
import NotFound from './pages/404'
import About from './pages/about'
import Admin from './pages/admin'
import RecipeRoutes from './pages/recipes/routes'
import IngredientsRoutes from './pages/ingredients/routes'
import { Route, IndexRoute } from 'react-router'

export default (
  <Route path='/' component={AppContainer}>
    { /* Home (main) route */ }
    <IndexRoute component={Home} />

    { /* Routes */ }
    <Route path='about' component={About} />
    <Route path='admin' component={Admin} />

    {RecipeRoutes}
    {IngredientsRoutes}

    { /* Catch all route */ }
    <Route path='*' component={NotFound} status={404} />
  </Route>
)
