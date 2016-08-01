import React from 'react'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-connect'
import { loadRecipe, loadDifficulties, loadUnits } from '../../app.redux'
import { loadIngredients } from '../../ingredients.redux'
import Serves from './components/Serves'
import Recipe from './components/Recipe'
import Headline from './components/Headline'
import RecipeHeadlines from './components/RecipeHeadlines'
import _ from 'lodash'

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
}], state => ({
  currentRecipe: state.app.currentRecipe,
  difficultyLookup: _.keyBy(state.app.difficulties, i => i.id),
  ingredientLookup: _.keyBy(state.ingredients.list, i => i.id),
  unitLookup: _.keyBy(state.app.units, i => i.id)
}))
export default class ViewRecipe extends React.Component {
  state = {
    modifyServes: 0
  }

  increaseServes = () => {
    this.setState({
      modifyServes: this.state.modifyServes + 1
    })
  }

  decreaseServes = () => {
    this.setState({
      modifyServes: this.state.modifyServes - 1
    })
  }

  render() {
    const { currentRecipe, difficultyLookup, ingredientLookup, unitLookup } = this.props
    const { name, totalTime, prepTime, serves, difficulty, ingredients, instructions } = currentRecipe
    const qtyModifier = (serves + this.state.modifyServes) / serves
    const servesElement = <Serves increase={this.increaseServes} decrease={this.decreaseServes}
                                  recipeServes={serves} servesModifier={this.state.modifyServes} />

    return (
      <div>
        <h1 className='text-center'>{name}</h1>
        <RecipeHeadlines>
          <Headline header='Total Time' value={`${totalTime}m`} separator />
          <Headline header='Prep Time' value={`${prepTime}m`} separator />
          <Headline header='Serves' value={servesElement} separator />
          <Headline header='Difficulty' value={difficultyLookup[difficulty].name} />
        </RecipeHeadlines>
        <Recipe ingredients={ingredients} instructions={instructions}
                qtyModifier={qtyModifier} ingredientLookup={ingredientLookup}
                unitLookup={unitLookup} />
      </div>
    )
  }
}
