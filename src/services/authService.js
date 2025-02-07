import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/auth'; 

const login = async (email, senha) => {
    const response = await axios.post(`${API_URL}/login`, { email, senha });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    } else {
        throw new Error("Login falhou");
    }
};

const logout = () => {
    localStorage.removeItem('token');
};

const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

export default {
    login,
    logout,
    isAuthenticated,
};