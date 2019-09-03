import React from 'react'
import {NavLink} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import {Navbar, Nav, NavItem, NavDropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom'
const stl = {
    textDecoration: 'none'
}

const SignedOutLinks = () => {
    return(
        
        <Navbar bg="dark" variant="dark" style={{ minWidth: 700, position: 'fixed' }}>
            <div className="container">
                <NavLink to='/'style={{ minWidth: 300 }} ><h3>Trans Global Logistics</h3></NavLink>
                <Nav className="mr-auto right-align">
                    <Nav.Link><NavLink to='/'>Home</NavLink></Nav.Link>
                    <Nav.Link><NavLink to='/about'>About</NavLink></Nav.Link>
                    <Nav.Link><NavLink to='/services'>Services</NavLink></Nav.Link>
                    <Nav.Link><NavLink to='/contact'>Contact</NavLink></Nav.Link>
                    <Nav.Link><NavLink to='/signin'><Button variant="primary">Login</Button></NavLink></Nav.Link>
                </Nav>
            </div>
        </Navbar>
        
        
    )
}

export default SignedOutLinks;