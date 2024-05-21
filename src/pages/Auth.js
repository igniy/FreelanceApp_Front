import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import '../styles/Auth.css';
import logo from '../assets/logo.png';

const Auth = () => {
    const { handleLogin, handleRegister } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'freelancer' // или 'client'
    });
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            if (isLogin) {
                await handleLogin(formData);
            } else {
                await handleRegister(formData);
            }
            navigate('/');
        } catch (error) {
            console.error('Authentication failed:', error);
            alert('Authentication failed.');
        }
    };

    return (
        <Container fluid className="auth-container d-flex align-items-center justify-content-center">
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={4}>
                    <Card className="auth-card p-4">
                        <Card.Body>
                            <div className="text-center mb-4">
                                <Image src={logo} alt="Logo" className="logo mb-2" />
                                <h2>{isLogin ? 'Login' : 'Register'}</h2>
                            </div>
                            <Form onSubmit={onSubmit}>
                                {!isLogin && (
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={onChange}
                                            placeholder="Username"
                                            required
                                        />
                                    </Form.Group>
                                )}
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={onChange}
                                        placeholder="Email Address"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={onChange}
                                        placeholder="Password"
                                        required
                                    />
                                </Form.Group>
                                {!isLogin && (
                                    <Form.Group className="mb-3">
                                        <Form.Select name="role" value={formData.role} onChange={onChange}>
                                            <option value="freelancer">Freelancer</option>
                                            <option value="client">Client</option>
                                        </Form.Select>
                                    </Form.Group>
                                )}
                                <Button type="submit" className="w-100 mb-3">
                                    {isLogin ? 'Login' : 'Sign up'}
                                </Button>
                            </Form>
                            <Button variant="link" onClick={toggleForm} className="w-100 toggle-button">
                                {isLogin ? 'Need to Register?' : 'Already have an account? Log In'}
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Auth;
