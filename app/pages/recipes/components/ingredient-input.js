import React from 'react'
import style from './ingredient-input.module.scss'
import autobind from 'autobind-decorator'
import { MenuItem, Glyphicon } from 'react-bootstrap'
import _ from 'lodash'

const Suggestion = ({ searchTerm, text, isSelected }) => (
  <div>{isSelected && <Glyphicon glyph='chevron-right' />}{text}</div>
)

@autobind
export default class IngredientInput extends React.Component {
  static propTypes = {
    units: React.PropTypes.array.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      currentValue: '',
      enteringQty: true,
      enteringUnit: false,
      suggestions: [],
      selectedSuggestion: -1
    }
  }

  getSuggestions(text) {
    return _.filter(
        this.props.units,
        u => u.name.toLowerCase().indexOf(text.toLowerCase()) !== -1)
        .map(u => ({ text: `${u.name}${u.abbreviation ? ` (${u.abbreviation})` : ''}`, value: u }))
  }

  handleInputChanged(e) {
    let suggestions = this.state.suggestions
    if (this.state.enteringUnit) {
      suggestions = this.getSuggestions(e.target.value)
    }

    this.setState({ currentValue: e.target.value, suggestions })
  }

  handleInputKeyDown(e) {
    // Handle space
    if (this.state.enteringQty && e.keyCode === 32) {
      this.setState({
        enteringQty: false,
        enteringUnit: true,
        qty: e.target.value,
        currentValue: '',
        suggestions: this.getSuggestions('')
      })

      e.stopPropagation()
      e.preventDefault()
    } else if (this.state.enteringUnit && e.keyCode === 8 && this.state.currentValue === '') {
      // Handle delete
      this.setState({
        enteringQty: true,
        enteringUnit: false,
        qty: '',
        currentValue: this.state.qty,
        suggestions: []
      })
    }
    if (this.state.suggestions.length > 0 && (e.keyCode === 40 || e.keyCode === 38)) {
      if (e.keyCode === 38) {
        this.setState({ selectedSuggestion: this.state.selectedSuggestion - 1 })
      } else {
        this.setState({ selectedSuggestion: this.state.selectedSuggestion + 1 })
      }
      e.stopPropagation()
      e.preventDefault()
    }

    if (this.state.selectedSuggestion >= 0 && e.keyCode === 13) {
      this.setState({
        unit: this.state.suggestions[this.state.selectedSuggestion].value,
        currentValue: '',
        suggestions: []
      })
      e.stopPropagation()
      e.preventDefault()
    }
  }

  selectSuggestion(suggestion) {
    console.log(suggestion)
    if (this.state.enteringUnit) {
      this.setState({
        unit: suggestion.value,
        currentValue: '',
        suggestions: []
      })
    }
  }

  render() {
    return (
      <div className={`form-control ${style.container}`} onMouseDown={this.handleContainerMouseDown}>
        {this.state.qty && <span className={style.qty}>{this.state.qty}</span>}
        {this.state.unit && <span className={style.unit}>{this.state.unit.name}</span>}

        <div className={`dropdown ${style.inputContainer}${this.state.suggestions.length > 0 ? ' open' : ''}`}>
          <input type='text' className={style.input}
            value={this.state.currentValue}
            onKeyDown={this.handleInputKeyDown}
            onChange={this.handleInputChanged}
          />
          <div className='dropdown-menu'>
            {this.state.suggestions.map((s, i) => (
              <MenuItem key={i.toString()}
                onClick={() => this.selectSuggestion(s)}
              >
                <Suggestion searchTerm={this.state.currentValue}
                  text={s.text}
                  isSelected={i === this.state.selectedSuggestion}
                />
              </MenuItem>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
