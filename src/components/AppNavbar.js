import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap';

import RegisterModal from './auth/registerModal';
import LogoutModal from './auth/logoutModal';
import LoginModal from './auth/loginModal';
import { UseAuthState } from '../App';

const AppNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const authState = UseAuthState();

    const authLinks = (
        <>
            <NavItem>
                <span className="navbar-text mr-3">
                    <strong>{authState.user ? `Welcome, ${authState.user.name}` : ''}</strong>
                </span>
            </NavItem>
            <NavItem>
                <LogoutModal />
            </NavItem>
        </>
    );
    
    const guestLinks = (
        <>
            <NavItem>
                <RegisterModal />                                    
            </NavItem>
            <NavItem>
                <LoginModal />                                    
            </NavItem>
        </>
    );
     return (
         <div>
             <Navbar color="light" light expand="sm" className="mb-5">
                 <Container>
                     <NavbarBrand href="/">Daily Journal</NavbarBrand>
                     <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
                      <Collapse isOpen={isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {authState.isAuthenticated ? authLinks : guestLinks}                                                                
                            </Nav>
                      </Collapse>     
                 </Container>
             </Navbar>
         </div>
     );
}

export default AppNavbar;