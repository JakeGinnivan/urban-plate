import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap'

const renderTextField = ({ input }) => (
  <FormControl {...input} />
)

const LoginForm = props => {
  const { handleSubmit, pristine, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <ControlLabel>Username</ControlLabel>
        <Field name='username' component={renderTextField} type='text' />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Password</ControlLabel>
        <Field name='password' component={renderTextField} type='text' />
      </FormGroup>
      <Button type='submit' bsStyle='primary' disabled={pristine || submitting}>Submit</Button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  pristine: React.PropTypes.bool.isRequired,
  submitting: React.PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'login' // a unique name for this form
})(LoginForm)
