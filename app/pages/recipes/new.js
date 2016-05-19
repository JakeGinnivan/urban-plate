import React from 'react'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-connect'
import NewRecipeForm from './components/new-recipe-form'
import { loadUnits, createRecipe } from '../../app.redux'
import { loadIngredients } from '../ingredients/ingredients.redux'
import autobind from 'autobind-decorator'

@asyncConnect([{
  promise: (props) => Promise.all([
    props.store.getState().app.unitsLoaded ?  Promise.resolve() : props.store.dispatch(loadUnits()),
    props.store.getState().ingredients.loaded ?  Promise.resolve() : props.store.dispatch(loadIngredients())
  ])
}])
@connect(state => ({
  units: state.app.units || [],
  ingredients: state.ingredients.list || []
}))
@autobind
export default class RecipeIndex extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired
  }

  handleSubmit(formData) {
    this.props.dispatch(createRecipe(formData))
  }

  render() {
    return (
      <NewRecipeForm onSubmit={this.handleSubmit}
        units={this.props.units}
        ingredients={this.props.ingredients}
      />
    )
  }
}
