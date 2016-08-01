import React from 'react'
import style from './IngredientInput.module.scss'
import { MenuItem } from 'react-bootstrap'
import Suggestion from './Suggestion'
import FocusOnMountInput from './FocusOnMountInput'
import _ from 'lodash'

const ESCAPE = 27
const DOWN = 40
const UP = 38
const SPACE = 32
const BACKSPACE = 8

export default class IngredientInput extends React.Component {
  static propTypes = {
    units: React.PropTypes.array.isRequired,
    ingredients: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    console.log('Form', props)
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

  getIngredientsSuggestions = (text, unit) => {
    return _.filter(
        this.props.ingredients,
        u => u.name.toLowerCase().indexOf(text.toLowerCase()) !== -1 &&
          u.measuredBy === (unit || this.state.unit).type)
        .map(u => ({ text: u.name, value: u }))
  }

  getUnitsSuggestions = (text) => {
    const unitSuggestions = _.filter(
      this.props.units,
      u => u.name.toLowerCase().indexOf(text.toLowerCase()) !== -1)
      .map(u => ({ text: `${u.name}${u.abbreviation ? ` (${u.abbreviation})` : ''}`, value: u, isIngredient: false }))
    const countIngredients = _.filter(
        this.props.ingredients,
        i => i.measuredBy === 'count'
      )
      .map(u => ({ text: u.name, value: u, isIngredient: true }))

    return _.concat(unitSuggestions, countIngredients)
  }

  changed = (overrides) => {
    this.props.onChange({
      qty: overrides.hasOwnProperty('qty') ? (overrides.qty || undefined) : this.state.qty,
      unit: overrides.hasOwnProperty('unit')
        ? overrides.unit || undefined
        : this.state.unit && this.state.unit.id,
      ingredient: overrides.hasOwnProperty('ingredient')
        ? overrides.ingredient || undefined
        : this.state.ingredient && this.state.ingredient.id
    })
  }

  handleInputChanged = (e) => {
    this.setState({ currentValue: e.target.value, suggestions: this.getSuggestions(e.target.value) })
  }

  getSuggestions = (forText) => {
    let suggestions = this.state.suggestions
    if (this.state.editingUnit) {
      suggestions = this.getUnitsSuggestions(forText)
    } else if (this.state.editingIngredient) {
      suggestions = this.getIngredientsSuggestions(forText)
    }

    return suggestions
  }

  handleInputKeyDown = (e) => {
    console.log(e.keyCode)
    // Handle space
    if (this.state.editingQty && e.keyCode === SPACE) {
      const qty = e.target.value
      this.setState({
        qty,
        editingQty: false,
        editingUnit: true,
        currentValue: '',
        suggestions: this.getUnitsSuggestions('')
      })
      this.changed({ qty })
      e.stopPropagation()
      e.preventDefault()
    } else if (this.state.editingUnit && e.keyCode === BACKSPACE && this.state.currentValue === '') {
      // Handle backspace on unit
      this.setState({
        qty: '',
        editingQty: true,
        editingUnit: false,
        currentValue: this.state.qty,
        suggestions: []
      })
      this.changed({ qty: false })
    } else if (this.state.editingIngredient && e.keyCode === BACKSPACE && this.state.currentValue === '') {
      // Handle backspace on ingredient
      this.setState({
        unit: '',
        editingQty: false,
        editingUnit: true,
        editingIngredient: false,
        currentValue: this.state.unit.name,
        suggestions: []
      })
      this.changed({ unit: '' })
    }
    if (this.state.suggestions.length > 0 && (e.keyCode === DOWN || e.keyCode === UP || e.keyCode === ESCAPE)) {
      if (e.keyCode === UP) {
        this.setState({ selectedSuggestion: this.state.selectedSuggestion - 1 })
      } else if (e.keyCode === DOWN) {
        this.setState({ selectedSuggestion: this.state.selectedSuggestion + 1 })
      } else if (e.keyCode === ESCAPE) {
        this.setState({ suggestions: [] })
      }
      e.stopPropagation()
      e.preventDefault()
    }

    if (this.state.suggestions.length === 0 && e.keyCode === DOWN) {
      this.setState({
        suggestions: this.getSuggestions(this.state.currentValue)
      })
    }

    if (this.state.selectedSuggestion >= 0 && e.keyCode === 13) {
      const suggestion = this.state.suggestions[this.state.selectedSuggestion]
      this.selectSuggestion(suggestion)
      e.stopPropagation()
      e.preventDefault()
    }
  }

  selectSuggestion = (suggestion) => {
    if (this.state.editingUnit && !suggestion.isIngredient) {
      let ingredient = this.state.ingredient
      if (ingredient && suggestion.value.type !== ingredient.measuredBy) {
        ingredient = null
      }
      this.setState({
        currentValue: ingredient ? ingredient.name : '',
        unit: suggestion.value,
        ingredient,
        selectedSuggestion: -1,
        suggestions: this.getIngredientsSuggestions('', suggestion.value),
        editingUnit: false,
        editingIngredient: true
      })
      this.changed({ qty: this.state.qty, unit: suggestion.value.id })
    } else if (this.state.editingIngredient || suggestion.isIngredient) {
      this.setState({
        currentValue: '',
        ingredient: suggestion.value,
        selectedSuggestion: -1,
        suggestions: [],
        editingUnit: false,
        editingIngredient: false
      })
      this.changed({
        qty: this.state.qty,
        unit: this.state.unit && this.state.unit.id,
        ingredient: suggestion.value.id
      })
    }
  }

  inputPlaceholder = () => {
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

  editQty = () => {
    this.setState({
      editingQty: true,
      editingUnit: false,
      editingIngredient: false,
      qty: null,
      currentValue: this.state.qty,
      suggestions: []
    })
  }

  editUnit = () => {
    const currentText = this.state.unit ? this.state.unit.name : ''
    this.setState({
      editingQty: false,
      editingUnit: true,
      editingIngredient: false,
      unit: null,
      currentValue: currentText,
      suggestions: this.getUnitsSuggestions(currentText)
    })
  }

  editIngredient = () => {
    this.setState({
      editingQty: false,
      editingUnit: false,
      editingIngredient: true,
      ingredient: null,
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
        {!this.state.unit && !this.state.editingUnit
          && this.state.ingredient && this.state.ingredient.measuredBy === 'count' &&
          <span className={style.unit} onClick={this.editUnit}>x</span>
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
