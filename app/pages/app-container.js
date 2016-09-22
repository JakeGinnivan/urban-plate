import * as React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Navbar, NavItem, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import PageLoadingNotification from '../components/page-loading-notification'
import logo from '../assets/logo.png'

@connect(state => ({
  pageLoading: !state.reduxAsyncConnect.loaded
}))
class AppContainer extends React.Component {
  static propTypes = {
    children: React.PropTypes.any.isRequired
  }

  render() {
    const { children } = this.props
    return (
      <div>
        <Navbar staticTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'><img src={logo} role='presentation' /></Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <LinkContainer to='/recipes'><NavItem>Recipes</NavItem></LinkContainer>
            <LinkContainer to='/ingredients'><NavItem>ingredients</NavItem></LinkContainer>
            <LinkContainer to='/about'><NavItem>About</NavItem></LinkContainer>
            <LinkContainer to='/admin'><NavItem>Admin</NavItem></LinkContainer>
          </Nav>
        </Navbar>
        <PageLoadingNotification loading={this.props.pageLoading} />
        <div className='container'>
          {children}
        </div>
      </div>
    )
  }
}

export default AppContainer
