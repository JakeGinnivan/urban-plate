import React from 'react'
import { Field, reduxForm } from 'redux-form'

const NewIngredientForm = props => {
  const { handleSubmit, pristine, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <Field name='ingredientName' component='input' type='text' />
      </div>
      <button type='submit' disabled={pristine || submitting}>Submit</button>
    </form>
  )
}

NewIngredientForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  pristine: React.PropTypes.bool.isRequired,
  submitting: React.PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'new-ingredient' // a unique name for this form
})(NewIngredientForm)
