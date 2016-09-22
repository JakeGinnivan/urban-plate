import * as React from 'react'
import { toReadableFraction, fractionToDecimal } from 'readable-fractions'
import styles from './Ingredient.module.scss'

const Ingredient = ({ ingredient, ingredientLookup, unitLookup, qtyModifier }) => {
  let qty
  if (ingredient.qty.indexOf('/') === -1) {
    qty = ingredient.qty * qtyModifier
  } else {
    qty = toReadableFraction(fractionToDecimal(ingredient.qty) * qtyModifier, true)
  }

  const unit = unitLookup[ingredient.unit]
  const ingredientDetails = ingredientLookup[ingredient.ingredient]

  return (
    <div className={styles.ingredient}>
      <div className={styles.qty}>{qty}{ingredient.unit && (unit.abbreviation || unit.name)}</div>
      <div className={styles.ingredientName}>{ingredientDetails.name}</div>
    </div>
  )
}

Ingredient.propTypes = {
  ingredient: React.PropTypes.object.isRequired,
  ingredientLookup: React.PropTypes.object.isRequired,
  unitLookup: React.PropTypes.object.isRequired,
  qtyModifier: React.PropTypes.number.isRequired
}

export default Ingredient
