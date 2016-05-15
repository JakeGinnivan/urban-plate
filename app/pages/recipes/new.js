import React from 'react'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-connect'
import NewRecipeForm from './components/new-recipe-form'
import { loadUnits } from '../../app.redux'

@asyncConnect([{
  promise: (props) => {
    if (props.store.getState().app.unitsLoaded) {
      return Promise.resolve()
    }
    return props.store.dispatch(loadUnits())
  }
}])
@connect(state => ({
  units: state.app.units
}))
export default class RecipeIndex extends React.Component {
  render() {
    return (
      <NewRecipeForm onSubmit={e => console.log(e)} units={this.props.units} />
    )
  }
}
