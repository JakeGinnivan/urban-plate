import React from 'react'
import { connect } from 'react-redux'
import NewIngredientForm from './components/new-ingredient-form'
import autobind from 'autobind-decorator'
import { create } from './ingredients.redux'

@connect(() => ({}))
@autobind
class NewIngredient extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired
  }

  handleSubmit(formData) {
    this.props.dispatch(create(formData))
  }

  render() {
    return (
      <NewIngredientForm onSubmit={this.handleSubmit} />
    )
  }
}

export default NewIngredient
