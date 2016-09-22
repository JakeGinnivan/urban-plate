import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { logIn, logOut } from './admin.redux'

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
        <div>
          <Button onClick={ this.logIn }>Log In</Button>
          <Button onClick={ this.logOut }>Log Out</Button>
        </div>
      </div>
    )
  }
}

export default Admin
