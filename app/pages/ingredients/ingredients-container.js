import React from 'react'

const IngredientsContainer = ({ children }) => (
  <div>
    {children}
  </div>
)

IngredientsContainer.propTypes = {
  children: React.PropTypes.any.isRequired
}

export default IngredientsContainer
