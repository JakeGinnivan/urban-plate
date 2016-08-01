import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { FormGroup, FormControl, Button } from 'react-bootstrap'
import IngredientInput from './IngredientInput'

const NewRecipeForm = props => {
  const renderInput = ingredient => (
    <IngredientInput
      {...ingredient.input}
      units={props.units}
      ingredients={props.ingredients}
    />
  );
  const renderIngredient = ({ fields }) => (
    <div>
      {fields.map((name, index) => (
        <Field key={index.toString()} name={name} component={renderInput} />
      ))}
      <Button onClick={() => fields.push({})}>Add Ingredient</Button>
    </div>
  )


  const renderInstructionFormControl = v => <FormControl {...v.input} />
  const renderInstruction = ({fields}) => (
    <div>
      {fields.map((name, index) => (
        <Field key={index.toString()} name={name} component={renderInstructionFormControl} type='text' />
      ))}
      <Button onClick={() => fields.push('')}>Add Step</Button>
    </div>
  )

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
      <FieldArray name='ingredients' component={renderIngredient} />
      <h2>Steps</h2>
      <FieldArray name='instructions' component={renderInstruction} />
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
