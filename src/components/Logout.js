import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        navigate('/');
    };

    return (
        <button onClick={handleLogout}>Sair</button>
    );
};

export default Logout;