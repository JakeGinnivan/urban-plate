import React from 'react'
import { Link } from 'react-router'
import { Navbar, NavItem, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import logo from '../assets/logo.png'

const AppContainer = ({ children }) => (
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
      </Nav>
    </Navbar>
    <div className='container'>
      {children}
    </div>
  </div>
)

AppContainer.propTypes = {
  children: React.PropTypes.any.isRequired
}

export default AppContainer
