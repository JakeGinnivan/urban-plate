import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { FormGroup, FormControl, Button } from 'react-bootstrap'
import IngredientInput from './ingredient-input'

const NewRecipeForm = props => {
  const { handleSubmit, pristine, submitting, difficulties } = props
  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <label>Recipe Name</label>
        <Field name='name' component={v => <FormControl {...v} />} type='text' />
      </FormGroup>
      <FormGroup>
        <label>Difficultly</label>
        <Field name='difficulty' component={v => (
          <FormControl {...v} componentClass='select'>
            {difficulties.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </FormControl>
        )}
        />
      </FormGroup>

      <FormGroup>
        <label>Prep time</label>
        <Field name='prepTime' component={v => <FormControl {...v} />} type='text' />
      </FormGroup>

      <FormGroup>
        <label>Total time</label>
        <Field name='totalTime' component={v => <FormControl {...v} />} type='text' />
      </FormGroup>
      <FormGroup>
        <label>Number servings</label>
        <Field name='serves' component={v => <FormControl {...v} />} type='text' />
      </FormGroup>

      <h2>Ingredients</h2>
      <FieldArray name='ingredients' component={ingredients => (
        <div>
          {ingredients.map((name, index) => (
            <Field key={index.toString()} name={name} component={ingredient => (
              <IngredientInput
                {...ingredient}
                units={props.units}
                ingredients={props.ingredients}
              />
            )}
            />
          ))}
          <Button onClick={() => ingredients.push({})}>Add Ingredient</Button>
        </div>
      )}
      />
      <h2>Steps</h2>
      <FieldArray name='instructions' component={steps => (
        <div>
          {steps.map((name, index) => (
            <Field key={index.toString()} name={name} component={v => <FormControl {...v} />} type='text' />
          ))}
          <Button onClick={() => steps.push('')}>Add Step</Button>
        </div>
      )}
      />
      <Button type='submit' bsStyle='primary' disabled={pristine || submitting}>Submit</Button>
    </form>
  )
}

NewRecipeForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  pristine: React.PropTypes.bool.isRequired,
  submitting: React.PropTypes.bool.isRequired,
  units: React.PropTypes.array.isRequired,
  ingredients: React.PropTypes.array.isRequired,
  difficulties: React.PropTypes.array.isRequired
}

export default reduxForm({
  form: 'new-recipe' // a unique name for this form
})(NewRecipeForm)
