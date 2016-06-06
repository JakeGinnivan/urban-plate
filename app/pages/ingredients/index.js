import React from 'react'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-connect'
import { loadIngredients } from '../../ingredients.redux'

@asyncConnect([{
  promise: (props) => {
    if (props.store.getState().ingredients.loaded) {
      return Promise.resolve()
    }
    return props.store.dispatch(loadIngredients())
  }
}])
@connect(state => ({
  ingredients: state.ingredients.list || []
}))
class IngredientsIndex extends React.Component {
  static propTypes = {
    ingredients: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired
    })).isRequired
  }

  render() {
    return (
      <div>
        {this.props.ingredients.map(i => (
          <div key={i.id.toString()}>{i.name}</div>
        ))}
      </div>
    )
  }
}

export default IngredientsIndex
