import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { handleLogin } = useContext(AuthContext);

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await handleLogin(formData);
            // alert('Login successful!');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed.');
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder="Email"
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
