import * as React from 'react'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-connect'
import { loadIngredients } from '../../ingredients.redux'
import * as styles from './styles.module.scss'
import { Link } from 'react-router'
import { Button } from 'react-bootstrap'

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
        <div>
          {this.props.ingredients.map(i => (
            <div key={i.id.toString()} className={styles.ingredient}>{i.name}</div>
          ))}
        </div>
        <div>
          <Link to='/ingredients/new'>
            <Button>New Ingredient</Button>
          </Link>
        </div>
      </div>
    )
  }
}

export default IngredientsIndex
