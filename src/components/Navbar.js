import React, { useContext } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navbar.css';
import logo from '../assets/logo.png'; // Путь к логотипу

const NavigationBar = () => {
    const { user, handleLogout, loading } = useContext(AuthContext);

    if (loading) {
        return null; // Или можно отобразить индикатор загрузки
    }

    return (
        <Navbar bg="light" expand="lg" className="navbar">
            <Container>
                <Navbar.Brand href="/">
                    <img src={logo} alt="FreeLancerPro Logo" style={{ width: '100px' }} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        {!user && (
                            <LinkContainer to="/auth">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        )}
                        {user && user.role === 'freelancer' && (
                            <LinkContainer to="/freelancer-profile">
                                <Nav.Link>Freelancer Profile</Nav.Link>
                            </LinkContainer>
                        )}
                        {user && user.role === 'client' && (
                            <LinkContainer to="/customer-profile">
                                <Nav.Link>Customer Profile</Nav.Link>
                            </LinkContainer>
                        )}
                        {user && user.role === 'client' && (
                            <LinkContainer to="/create-project">
                                <Nav.Link>Create Project</Nav.Link>
                            </LinkContainer>
                        )}
                        {user && (
                            <Button variant="outline-danger" onClick={handleLogout}>
                                Logout
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
