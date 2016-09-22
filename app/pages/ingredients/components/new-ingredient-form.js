import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { ControlLabel, FormGroup, FormControl, Button } from 'react-bootstrap'

const renderTextFormControl = ({ input, label, meta: { touched, error } }) => (
  <FormControl
    hintText={label}
    errorText={touched && error}
    {...input}
  />
)

const renderMeasureSelectFormControl = ({ input, label, meta: { touched, error } }) => (
  <FormControl
    componentClass='select'
    hintText={label}
    errorText={touched && error}
    {...input}
  >
    <option value='count'>Count (i.e 1x Clove garlic, 2x Red Chilli)</option>
    <option value='volume'>Volume (i.e cups, ml, tbsp)</option>
    <option value='weight'>Weight (i.e grams, pounds)</option>
  </FormControl>
)

const NewIngredientForm = props => {
  const { handleSubmit, pristine, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <ControlLabel>Name</ControlLabel>
        <Field name='name' component={renderTextFormControl} type='text' />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Measured by</ControlLabel>
        <Field name='measuredBy' component={renderMeasureSelectFormControl} />
      </FormGroup>
      <Button type='submit' bsStyle='primary' disabled={pristine || submitting}>Submit</Button>
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
