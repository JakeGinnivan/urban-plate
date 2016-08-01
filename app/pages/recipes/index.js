import React from 'react'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-connect'
import { loadRecipes } from '../../app.redux'
import RecipeList from './components/recipe-list'

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
