import React from 'react'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-connect'
import autobind from 'autobind-decorator'
import { loadRecipe, loadDifficulties, loadUnits } from '../../app.redux'
import { loadIngredients } from '../../ingredients.redux'
import styles from './view.module.scss'
import _ from 'lodash'
import { toReadableFraction, fractionToDecimal } from 'readable-fractions'

const Headline = props => (
  <div className={styles.headline} style={{ borderRight: props.separator ? '1px solid lightgrey' : 'none' }}>
    <div><strong>{props.header}</strong></div>
    <div>{props.value}</div>
  </div>
)

const Ingredient = ({ ingredient, ingredientLookup, unitLookup, qtyModifier }) => {
  let qty
  if (ingredient.qty.indexOf('/') === -1) {
    qty = ingredient.qty * qtyModifier
  } else {
    qty = toReadableFraction(fractionToDecimal(ingredient.qty) * qtyModifier, true)
  }
  // TODO support fractions
  return (
    <div className={styles.ingredient}>
      <div className={styles.qty}>{qty}{ingredient.unit && (unitLookup[ingredient.unit].abbreviation || unitLookup[ingredient.unit].name)}</div>
      <div className={styles.ingredientName}>{ingredientLookup[ingredient.ingredient].name}</div>
    </div>
  )
}

const Serves = ({ increase, decrease, recipeServes, servesModifier }) => {
  const effectiveServes = recipeServes + servesModifier
  const canDecreaseServes = effectiveServes > 1
  return (
    <div className={styles.servesContainer}>
      {canDecreaseServes && <div className={styles.changeServeSize} onClick={decrease}>-</div>}
      <div className={styles.serves}>{effectiveServes}</div>
      <div className={styles.changeServeSize} onClick={increase}>+</div>
    </div>
  )
}

@asyncConnect([{
  promise: (props) => {
    const promises = []
    const appState = props.store.getState()
    const currentRecipe = appState.app.currentRecipe
    if (!currentRecipe || currentRecipe.id !== props.params.id) {
      promises.push(props.store.dispatch(loadRecipe(props.params.id)))
    }
    if (!appState.difficultiesLoaded) {
      promises.push(props.store.dispatch(loadDifficulties()))
    }
    if (!appState.unitsLoaded) {
      promises.push(props.store.dispatch(loadUnits()))
    }
    if (!appState.ingredients.loaded) {
      promises.push(props.store.dispatch(loadIngredients()))
    }
    return Promise.all(promises)
  }
}])
@connect(state => ({
  currentRecipe: state.app.currentRecipe,
  difficultyLookup: _.keyBy(state.app.difficulties, i => i.id),
  ingredientLookup: _.keyBy(state.ingredients.list, i => i.id),
  unitLookup: _.keyBy(state.app.units, i => i.id)
}))
@autobind
export default class ViewRecipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modifyServes: 0
    }
  }

  increaseServes() {
    this.setState({
      modifyServes: this.state.modifyServes + 1
    })
  }

  decreaseServes() {
    this.setState({
      modifyServes: this.state.modifyServes - 1
    })
  }

  render() {
    const { currentRecipe, difficultyLookup, ingredientLookup, unitLookup } = this.props
    const { name, totalTime, prepTime, serves, difficulty, ingredients, instructions } = currentRecipe
    const qtyModifier = (serves + this.state.modifyServes) / serves
    return (
      <div>
        <h1 className='text-center'>{name}</h1>
        <div className={styles.headlines}>
          <Headline header='Total Time' value={`${totalTime}m`} separator />
          <Headline header='Prep Time' value={`${prepTime}m`} separator />
          <Headline header='Serves' value={<Serves increase={this.increaseServes} decrease={this.decreaseServes} recipeServes={serves} servesModifier={this.state.modifyServes} />} separator />
          <Headline header='Difficulty' value={difficultyLookup[difficulty].name} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ width: 'auto', marginRight: '50px' }}>
            <h2 style={{ borderBottom: '2px solid black' }}>Ingredients</h2>
            <div style={{ display: 'table' }}>
              {ingredients.map((v, i) => (
                <Ingredient key={i} ingredient={v} qtyModifier={qtyModifier}
                  ingredientLookup={ingredientLookup} unitLookup={unitLookup}
                />
              ))}
            </div>
          </div>
          <div style={{ flexGrow: 1 }}>
            <h2 style={{ borderBottom: '2px solid black' }}>Instructions</h2>
            <ol>
              {instructions.map((v, i) => (
                <li key={i} style={{ margin: '20px 0', paddingLeft: '15px', borderLeft: '2px solid lightgrey' }}>{v}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}
