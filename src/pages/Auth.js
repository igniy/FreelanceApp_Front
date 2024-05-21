import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';
import logo from '../assets/logo.png'; // Добавьте ваш логотип в папку assets

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
        <div className="auth-container">
            <div className="auth-card">
                <img src={logo} alt="Logo" className="logo" />
                <h2>{isLogin ? 'Login' : 'Register'}</h2>
                <form onSubmit={onSubmit}>
                    {!isLogin && (
                        <div className="input-group">
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={onChange}
                                placeholder="Username"
                                required
                            />
                        </div>
                    )}
                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={onChange}
                            placeholder="Email Address"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={onChange}
                            placeholder="Password"
                            required
                        />
                    </div>
                    {!isLogin && (
                        <div className="input-group">
                            <select name="role" value={formData.role} onChange={onChange}>
                                <option value="freelancer">Freelancer</option>
                                <option value="client">Client</option>
                            </select>
                        </div>
                    )}
                    <button type="submit" className="auth-button">
                        {isLogin ? 'Login' : 'Sign in'}
                    </button>
                </form>
                <button onClick={toggleForm} className="toggle-button">
                    {isLogin ? 'Need to Register?' : 'Already have an account? Log In'}
                </button>
            </div>
        </div>
    );
};

export default Auth;
