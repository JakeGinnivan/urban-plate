import * as React from 'react'
import { asyncConnect } from 'redux-connect'
import { loadRecipes } from 'app.redux'
import RecipeList from './components/RecipeList'
import { IStore, ISiteState } from 'app.d'

interface IRecipeProps {
  recipes: any[]
}

const load = [{
  promise: ({ store }: { store: IStore }) => Promise.all([
    store.getState().app.recipesLoaded ? Promise.resolve() : store.dispatch(loadRecipes())
  ])
}]
const mapStateToProps = (state: ISiteState) => ({
  recipes: state.app.recipes || []
})

@asyncConnect(load, mapStateToProps)
export default class RecipeIndex extends React.Component<IRecipeProps, {}> {
  render() {
    return (
      <RecipeList recipes={this.props.recipes} />
    )
  }
}

