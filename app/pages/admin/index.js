import React from 'react'
import { connect } from 'react-redux'
import { logIn, logOut } from './admin.redux'
import LoginForm from './components/LoginForm'

@connect(state => ({
  loggedIn: state.admin.loggedIn
}))
class Admin extends React.Component {
  static propTypes = {
    loggedIn: React.PropTypes.bool.isRequired
  }

  logIn = () => {
    this.props.dispatch(logIn())
  }

  logOut = () => {
    this.props.dispatch(logOut())
  }

  render() {
    return (
      <div>
        <div>Logged in: {this.props.loggedIn.toString()}</div>
        <LoginForm onSubmit={this.logIn} />
      </div>
    )
  }
}

export default Admin
