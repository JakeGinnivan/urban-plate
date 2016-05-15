import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { FormGroup, FormControl, Button } from 'react-bootstrap'
import IngredientInput from './ingredient-input'

const NewRecipeForm = props => {
  const { handleSubmit, pristine, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <label>Recipe Name</label>
        <Field name='name' component={v => <FormControl {...v} />} type='text' />
      </FormGroup>
      <FormGroup>
        <label>Number servings</label>
        <Field name='name' component={v => <FormControl {...v} />} type='text' />
      </FormGroup>

      <h2>Ingredients</h2>
      <FieldArray name='ingredients' component={ingredients => {
        // console.log('Ingredients', ingredients)
        return (
          <div>
            {ingredients.map((name, index) => (
              <Field name={name} component={ingredient => (
                <IngredientInput key={index} {...ingredient} units={props.units} />
              )}
              />
            ))}
            <Button onClick={() => ingredients.push({})}>Add Ingredient</Button>
          </div>
        )
      }}
      />
      <Button type='submit' bsStyle='primary' disabled={pristine || submitting}>Submit</Button>
    </form>
  )
}

NewRecipeForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  pristine: React.PropTypes.bool.isRequired,
  submitting: React.PropTypes.bool.isRequired,
  units: React.PropTypes.array.isRequired
}

export default reduxForm({
  form: 'new-recipe' // a unique name for this form
})(NewRecipeForm)
