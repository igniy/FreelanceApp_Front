import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import CreateProject from './pages/CreateProject';
import CustomerProfile from './pages/CustomerProfile';
import FreelancerProfile from './pages/FreelancerProfile';
import { AuthProvider } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/App.css';

const AppLayout = ({ children }) => {
    const location = useLocation();
    const hideNavbarAndFooter = location.pathname === '/auth';

    return (
        <div className="App">
            {!hideNavbarAndFooter && <header><h1>FreeLancerPro</h1></header>}
            {!hideNavbarAndFooter && <Navbar />}
            <div className="container">{children}</div>
            {!hideNavbarAndFooter && (
                <footer>
                    <p>© 2024 FreelancePro - сервис по поиску фрилансеров. Made by Kvashnin Yuriy RTU "MIREA"</p>
                </footer>
            )}
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppLayout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/create-project" element={<CreateProject />} />
                        <Route path="/customer-profile" element={<CustomerProfile />} />
                        <Route path="/freelancer-profile" element={<FreelancerProfile />} />
                    </Routes>
                </AppLayout>
            </Router>
        </AuthProvider>
    );
}

export default App;
