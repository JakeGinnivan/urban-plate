import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

const NewRecipeForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <Field name='test' component='input' type='text' />
      </div>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default reduxForm({
  form: 'new-recipe' // a unique name for this form
})(NewRecipeForm)
