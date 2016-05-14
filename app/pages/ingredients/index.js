import React from 'react'
import { asyncConnect } from 'redux-connect'
import { loadIngredients } from './ingredients.redux'

@asyncConnect([{
  promise: (props) => {
    return props.store.dispatch(loadIngredients())
  }
}])
class IngredientsIndex extends React.Component {
  render() {
    return <div>Hi</div>
  }
}

export default IngredientsIndex
