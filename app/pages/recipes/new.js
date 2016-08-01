import React from 'react'
import { asyncConnect } from 'redux-connect'
import NewRecipeForm from './components/NewRecipeForm'
import { InlineNotification } from 'react-redux-notifications'
import { loadUnits, createRecipe, loadDifficulties, CREATE_RECIPE } from '../../app.redux'
import { loadIngredients } from '../../ingredients.redux'
import { Alert } from 'react-bootstrap'

@asyncConnect([{
  promise: (props) => Promise.all([
    props.store.getState().app.unitsLoaded ? Promise.resolve() : props.store.dispatch(loadUnits()),
    props.store.getState().app.difficultiesLoaded ? Promise.resolve() : props.store.dispatch(loadDifficulties()),
    props.store.getState().ingredients.loaded ? Promise.resolve() : props.store.dispatch(loadIngredients())
  ])
}], state => ({
  units: state.app.units || [],
  difficulties: state.app.difficulties || [],
  ingredients: state.ingredients.list || []
}))
export default class RecipeIndex extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired
  }

  handleSubmit = (formData) => {
    return this.props.dispatch(createRecipe(formData))
      .then(() => this.props.dispatch({ type: 'redux-form/RESET', meta: { form: 'new-recipe' } }))
  }

  render() {
    return (
      <div>
        <InlineNotification
          defaultMessage='Successfully created recipe'
          triggeredBy={`${CREATE_RECIPE}_SUCCESS`}
          hideAfter={3000}
          renderNotification={notification => (
            <Alert bsStyle='success'>{notification.message}</Alert>
          )}
        />
        <NewRecipeForm onSubmit={this.handleSubmit}
          units={this.props.units}
          ingredients={this.props.ingredients}
          difficulties={this.props.difficulties}
        />
      </div>
    )
  }
}
