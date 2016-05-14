import React from 'react'
import NewRecipeForm from './components/new-recipe-form'

const RecipeIndex = () => <NewRecipeForm onSubmit={e => console.log(e)} />

export default RecipeIndex
