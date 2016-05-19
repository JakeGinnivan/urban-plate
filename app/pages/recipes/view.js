import React from 'react'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-connect'
import autobind from 'autobind-decorator'
import { loadRecipe } from '../../app.redux'

@asyncConnect([{
  promise: (props) => {
    console.log(props)
    const currentRecipe = props.store.getState().app.currentRecipe
    if (!currentRecipe || currentRecipe.id !== props.params.id) {
      props.store.dispatch(loadRecipe(props.params.id))
    }
    return Promise.resolve()
  }
}])
@connect(state => ({
  currentRecipe: state.app.currentRecipe
}))
@autobind
export default class ViewRecipe extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.currentRecipe.name}</h2>
      </div>
    )
  }
}
