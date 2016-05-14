import React from 'react'
import NewIngredientForm from './components/new-ingredient-form'

const NewIngredient = () => <NewIngredientForm onSubmit={e => console.log(e)} />

export default NewIngredient
