import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navbar.css';
import logo from '../assets/logo.png'; // Путь к логотипу

const Navbar = () => {
    const { user, handleLogout, loading } = useContext(AuthContext);

    if (loading) {
        return null; // Или можно отобразить индикатор загрузки
    }

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="FreeLancerPro Logo" />
            </div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {!user && (
                    <>
                        <li>
                            <Link to="/auth">Login</Link>
                        </li>
                    </>
                )}
                {user && user.role === 'freelancer' && (
                    <li>
                        <Link to="/freelancer-profile">Freelancer Profile</Link>
                    </li>
                )}
                {user && user.role === 'client' && (
                    <li>
                        <Link to="/customer-profile">Customer Profile</Link>
                    </li>
                )}
                {user && (
                    <>
                        {user.role === 'client' && (
                            <li>
                                <Link to="/create-project">Create Project</Link>
                            </li>
                        )}

                        <li>
                            <button onClick={handleLogout} className="logout-button">Logout</button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
