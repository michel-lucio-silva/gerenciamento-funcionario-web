import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import authService from '../services/authService';
import '../css/Menu.css'; 

const Menu = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        authService.logout();
        navigate('/login'); 
    };

    return (
        <nav>
            <ul>
                {location.pathname !== '/login' && (
                    <li><Link to="/funcionarios">Home</Link></li>
                )}
                {location.pathname !== '/login' && (
                    <button className='sair' onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Sair</span>
                    </button>
                )}
            </ul>
        </nav>
    );
};

export default Menu;