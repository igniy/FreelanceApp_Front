import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'client' // default role
    });

    const { handleRegister } = useContext(AuthContext);

    const { username, email, password, role } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await handleRegister(formData);
            //alert('Registration successful!');
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed.');
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Register</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={onChange}
                        placeholder="Username"
                        required
                    />
                </div>
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
                <div>
                    <select name="role" value={role} onChange={onChange}>
                        <option value="client">Client</option>
                        <option value="freelancer">Freelancer</option>
                    </select>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
