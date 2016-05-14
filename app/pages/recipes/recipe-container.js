import React from 'react'
import { Link } from 'react-router'

const RecipeContainer = ({ children }) => (
  <div>
    <ul><li><Link to='/recipes/new'>New</Link></li></ul>
    <div>
      {children}
    </div>
  </div>
)

RecipeContainer.propTypes = {
  children: React.PropTypes.any.isRequired
}

export default RecipeContainer
