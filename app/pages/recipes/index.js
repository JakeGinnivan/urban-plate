import React from 'react'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-connect'
import { loadRecipes } from '../../app.redux'
import RecipeList from './components/recipe-list'

@asyncConnect([{
  promise: (props) => Promise.all([
    props.store.getState().app.recipesLoaded ? Promise.resolve() : props.store.dispatch(loadRecipes())
  ])
}])
@connect(state => ({
  recipes: state.app.recipes || []
}))
export default class RecipeIndex extends React.Component {
  render() {
    return (
      <RecipeList recipes={this.props.recipes} />
    )
  }
}
