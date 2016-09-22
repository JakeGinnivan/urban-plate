import * as React from 'react'
import { Link } from 'react-router'

const RecipeContainer = ({ children }) => (
  <div>
    {children}
  </div>
)

RecipeContainer.propTypes = {
  children: React.PropTypes.any.isRequired
}

export default RecipeContainer
