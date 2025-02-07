import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Menu from './components/Menu';
import ListaFuncionarios from './components/ListaFuncionarios';
import AdicionarFuncionario from './components/AdicionarFuncionario';
import EditarFuncionario from './components/EditarFuncionario';
import Login from './components/Login'; 
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
    return (
        <Router>
            <div>
                <Menu />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/funcionarios" element={<ListaFuncionarios />} />
                    <Route path="/funcionarios/adicionar" element={<AdicionarFuncionario />} />
                    <Route path="/funcionarios/editar/:id" element={<EditarFuncionario />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;