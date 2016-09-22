import * as React from 'react'
import { Glyphicon } from 'react-bootstrap'

const Suggestion = ({ text, isSelected }) => (
  <div>{isSelected && <Glyphicon glyph='chevron-right' />}{text}</div>
)
Suggestion.propTypes = {
  text: React.PropTypes.string.isRequired,
  isSelected: React.PropTypes.bool.isRequired
}

export default Suggestion
