import React from 'react'
import style from './ingredient-input.module.scss'
import autobind from 'autobind-decorator'
import { MenuItem, Glyphicon } from 'react-bootstrap'
import _ from 'lodash'

const Suggestion = ({ searchTerm, text, isSelected }) => (
  <div>{isSelected && <Glyphicon glyph='chevron-right' />}{text}</div>
)

class FocusOnMountInput extends React.Component {
  componentDidMount() {
    if (this.input) {
      this.input.focus()
      this.input.setSelectionRange(0, this.input.value.length)
    }
  }
  render() {
    return <input ref={i => { this.input = i }} {...this.props} />
  }
}

@autobind
export default class IngredientInput extends React.Component {
  static propTypes = {
    units: React.PropTypes.array.isRequired,
    ingredients: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      currentValue: '',
      qty: props.value.qty,
      unit: props.value.unit,
      ingredient: props.value.ingredient,
      editingQty: true,
      editingUnit: false,
      editingIngredient: false,
      suggestions: [],
      selectedSuggestion: -1
    }
  }

  getIngredientsSuggestions(text, unit) {
    return _.filter(
        this.props.ingredients,
        u => u.name.toLowerCase().indexOf(text.toLowerCase()) !== -1 &&
          u.measuredBy === (unit || this.state.unit).type)
        .map(u => ({ text: u.name, value: u }))
  }

  getUnitsSuggestions(text) {
    return _.filter(
        this.props.units,
        u => u.name.toLowerCase().indexOf(text.toLowerCase()) !== -1)
        .map(u => ({ text: `${u.name}${u.abbreviation ? ` (${u.abbreviation})` : ''}`, value: u }))
  }

  changed(qty, unit, ingredient) {
    this.props.onChange({
      qty,
      unit,
      ingredient
    })
  }

  handleInputChanged(e) {
    let suggestions = this.state.suggestions
    if (this.state.editingUnit) {
      suggestions = this.getUnitsSuggestions(e.target.value)
    }

    this.setState({ currentValue: e.target.value, suggestions })
  }

  handleInputKeyDown(e) {
    // Handle space
    if (this.state.editingQty && e.keyCode === 32) {
      const qty = e.target.value
      this.setState({
        qty,
        editingQty: false,
        editingUnit: true,
        currentValue: '',
        suggestions: this.getUnitsSuggestions('')
      })
      this.changed(qty)
      e.stopPropagation()
      e.preventDefault()
    } else if (this.state.editingUnit && e.keyCode === 8 && this.state.currentValue === '') {
      // Handle delete
      this.setState({
        qty: '',
        editingQty: true,
        editingUnit: false,
        currentValue: this.state.qty,
        suggestions: []
      })
      this.changed()
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
      const suggestion = this.state.suggestions[this.state.selectedSuggestion]
      this.selectSuggestion(suggestion)
      e.stopPropagation()
      e.preventDefault()
    }
  }

  selectSuggestion(suggestion) {
    if (this.state.editingUnit) {
      this.setState({
        currentValue: '',
        unit: suggestion.value,
        selectedSuggestion: -1,
        suggestions: this.getIngredientsSuggestions('', suggestion.value),
        editingUnit: false,
        editingIngredient: true
      })
      this.changed(this.state.qty, suggestion.value)
    } else if (this.state.editingIngredient) {
      this.setState({
        currentValue: '',
        ingredient: suggestion.value,
        selectedSuggestion: -1,
        suggestions: [],
        editingUnit: false,
        editingIngredient: false
      })
      this.changed(this.state.qty, this.state.unit, suggestion.value)
    }
  }

  inputPlaceholder() {
    if (this.state.editingQty) {
      return 'weight/qty/volume'
    }
    if (this.state.editingUnit) {
      return 'measurement type'
    }
    if (this.state.editingIngredient) {
      return 'ingredient/item'
    }
  }

  editQty() {
    this.setState({
      editingQty: true,
      editingUnit: false,
      editingIngredient: false,
      currentValue: this.state.qty,
      suggestions: []
    })
  }

  editUnit() {
    this.setState({
      editingQty: false,
      editingUnit: true,
      editingIngredient: false,
      currentValue: this.state.unit.name,
      suggestions: this.getUnitsSuggestions(this.state.unit.name)
    })
  }

  editIngredient() {
    this.setState({
      editingQty: false,
      editingUnit: false,
      editingIngredient: true,
      currentValue: this.state.ingredient.name,
      suggestions: this.getIngredientsSuggestions(this.state.ingredient.name)
    })
  }

  render() {
    const openClass = this.state.suggestions.length > 0 ? ' open' : ''
    const editor = (
      <div className={`dropdown ${style.inputContainer}${openClass}`}>
        <FocusOnMountInput type='text' className={style.input}
          placeholder={this.inputPlaceholder()}
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
    )
    return (
      <div className={`form-control ${style.container}`}
        onMouseDown={this.handleContainerMouseDown}
      >
        {this.state.qty && !this.state.editingQty &&
          <span className={style.qty} onClick={this.editQty}>
            {this.state.qty}
          </span>
        }
        {this.state.editingQty && editor}

        {this.state.unit && !this.state.editingUnit &&
          <span className={style.unit} onClick={this.editUnit}>
            {this.state.unit.name}
          </span>
        }
        {this.state.editingUnit && editor}

        {this.state.ingredient && !this.state.editingIngredient &&
          <span className={style.ingredient} onClick={this.editIngredient}>
            {this.state.ingredient.name}
          </span>
        }
        {this.state.editingIngredient && editor}
      </div>
    )
  }
}
