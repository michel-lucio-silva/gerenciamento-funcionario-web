import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/Funcionario'; // Pega a URL base do .env

const getFuncionarios = async () => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

const getFuncionario = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

const getLideresEDiretores = async () => {
    const response = await axios.get(`${API_URL}/lider-e-diretor`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

const addFuncionario = async (funcionario) => {

    const payload = {
        Nome: funcionario.nome,
        Sobrenome: funcionario.sobrenome,
        Email: funcionario.email,
        NumeroDocumento: funcionario.numeroDocumento,
        Telefone: funcionario.telefone,
        NomeGestor: funcionario.gestorId, 
        Senha: funcionario.senha, 
        DataNascimento: funcionario.dataNascimento,
        Role: funcionario.role,
    };
    
    await axios.post(API_URL, payload, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
};

const updateFuncionario = async (id, funcionario) => {
    const payload = {
        Nome: funcionario.nome,
        Sobrenome: funcionario.sobrenome,
        Email: funcionario.email,
        NumeroDocumento: funcionario.numeroDocumento,
        Telefone: funcionario.telefones,
        NomeGestor: funcionario.gestorId, 
        Senha: funcionario.senha, 
        DataNascimento: funcionario.dataNascimento,
        Role: funcionario.role,
    };

    await axios.put(`${API_URL}/${id}`, payload, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
};

const deleteFuncionario = async (id) => {
    await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
};

export default {
    getFuncionarios,
    getFuncionario,
    getLideresEDiretores,
    addFuncionario,
    updateFuncionario,
    deleteFuncionario,
};