import * as React from 'react'
import { asyncConnect } from 'redux-connect'
import { loadRecipes } from 'app.redux'
import RecipeList from './components/RecipeList'
import { IStore } from 'app.d'

interface IRecipeProps {
  recipes: any[]
}

@asyncConnect([{
  promise: ({ store }: { store: IStore }) => Promise.all([
    store.getState().app.recipesLoaded ? Promise.resolve() : store.dispatch(loadRecipes())
  ])
}], state => ({
  recipes: state.app.recipes || []
}))
export default class RecipeIndex extends React.Component<IRecipeProps, {}> {
  render() {
    return (
      <RecipeList recipes={this.props.recipes} />
    )
  }
}

