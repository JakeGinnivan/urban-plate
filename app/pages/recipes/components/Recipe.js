import * as React from 'react'
import Ingredient from './Ingredient'

const Recipe = ({ ingredients, instructions, qtyModifier, ingredientLookup, unitLookup }) => (
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
)

Recipe.propTypes = {
  ingredients: React.PropTypes.array.isRequired,
  instructions: React.PropTypes.array.isRequired
}

export default Recipe
