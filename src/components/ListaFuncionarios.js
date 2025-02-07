import React, { useEffect, useState } from 'react';
import funcionarioService from '../services/funcionarioService';
import { useNavigate } from 'react-router-dom';
import '../css/ListaFuncionarios.css';

const ListaFuncionarios = () => {
    const [funcionarios, setFuncionarios] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFuncionarios = async () => {
            const data = await funcionarioService.getFuncionarios();
            const funcionariosComNomeGestor = await Promise.all(
                data.map(async (funcionario) => {
                    if (funcionario.nomeGestor) {
                        const gestor = await funcionarioService.getFuncionario(funcionario.nomeGestor);
                        return {
                            ...funcionario,
                            nomeGestor: `${gestor.nome} ${gestor.sobrenome}`,
                        };
                    } else {
                        return funcionario;
                    }
                })
            );
            setFuncionarios(funcionariosComNomeGestor);
        };
        fetchFuncionarios();
    }, []);

    const handleDelete = async (id) => {
        await funcionarioService.deleteFuncionario(id);
        setFuncionarios(funcionarios.filter(f => f.id !== id));
    };

    const handleEdit = (id) => {
        navigate(`/funcionarios/editar/${id}`);
    };

    const indexOfLastFuncionario = currentPage * itemsPerPage;
    const indexOfFirstFuncionario = indexOfLastFuncionario - itemsPerPage;
    const currentFuncionarios = funcionarios.slice(indexOfFirstFuncionario, indexOfLastFuncionario);

    const totalPages = Math.ceil(funcionarios.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container">
            <h2>Lista de Funcionários</h2>
            <button className="add-button" onClick={() => navigate('/funcionarios/adicionar')}>
                <i className="fas fa-plus"></i> 
            </button>
            <table className="funcionario-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th>Número do Documento</th>
                        <th>Nome do Gestor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {currentFuncionarios.map((funcionario) => (
                        <tr key={funcionario.id}>
                            <td>{`${funcionario.nome} ${funcionario.sobrenome}`}</td>
                            <td>{funcionario.telefone.join(', ')}</td>
                            <td>{funcionario.email}</td>
                            <td>{funcionario.numeroDocumento}</td>
                            <td>{funcionario.nomeGestor}</td>
                            <td className="action-cell">
                                <button onClick={() => handleEdit(funcionario.id)} className="action-button">
                                    <i className="fas fa-pencil-alt"></i> 
                                </button>
                                <button onClick={() => handleDelete(funcionario.id)} className="action-button">
                                    <i className="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button className='pagination-width' key={index + 1} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ListaFuncionarios; 