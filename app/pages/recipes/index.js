import React from 'react'
import { asyncConnect } from 'redux-connect'
import { loadRecipes } from '../../app.redux'
import RecipeList from './components/RecipeList'

@asyncConnect([{
  promise: ({ store }) => Promise.all([
    store.getState().app.recipesLoaded ? Promise.resolve() : store.dispatch(loadRecipes())
  ])
}], state => ({
  recipes: state.app.recipes || []
}))
export default class RecipeIndex extends React.Component {
  render() {
    return (
      <RecipeList recipes={this.props.recipes} />
    )
  }
}
