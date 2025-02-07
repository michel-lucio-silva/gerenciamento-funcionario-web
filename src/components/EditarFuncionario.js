import React, { useEffect, useState } from 'react';
import funcionarioService from '../services/funcionarioService';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/EditarFuncionario.css'; 

const rolesMap = {
    0: 'Funcionário',
    1: 'Líder',
    2: 'Diretor',
};

const rolesArray = Object.entries(rolesMap);

const EditarFuncionario = () => {
    const { id } = useParams();
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [role, setRole] = useState(0);
    const [email, setEmail] = useState('');
    const [telefones, setTelefones] = useState(['']);
    const [dataNascimento, setDataNascimento] = useState('');
    const [numeroDocumento, setNumeroDocumento] = useState('');
    const [gestorId, setGestorId] = useState('');
    const [gestores, setGestores] = useState([]);
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFuncionario = async () => {
            try {
                const funcionario = await funcionarioService.getFuncionario(id);
                setNome(funcionario.nome);
                setSobrenome(funcionario.sobrenome);
                setRole(funcionario.role);
                setEmail(funcionario.email);
                setTelefones(funcionario.telefone.length > 0 ? funcionario.telefone : ['']);
                const formattedDate = funcionario.dataNascimento.split('T')[0];
                setDataNascimento(formattedDate);
                setNumeroDocumento(funcionario.numeroDocumento);
                setGestorId(funcionario.gestorId);
            } catch (error) {
                setErro("Erro ao buscar funcionário:");
            }
        };

        const fetchGestores = async () => {
            const data = await funcionarioService.getLideresEDiretores();
            setGestores(data);
        };

        fetchFuncionario();
        fetchGestores();
    }, [id]);

    const handleAddTelefone = () => {
        setTelefones([...telefones, '']); 
    };

    const handleTelefoneChange = (index, value) => {
        const newTelefones = [...telefones];
        newTelefones[index] = value; 
        setTelefones(newTelefones);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (telefones.every(telefone => telefone.trim() === '')) {
            alert('Por favor, preencha pelo menos um número de telefone.');
            return;
        }

        try{
            await funcionarioService.updateFuncionario(id, {
                nome,
                sobrenome,
                role,
                email,
                telefones,
                dataNascimento,
                numeroDocumento,
                gestorId,
            });
            navigate('/funcionarios');
        }catch(error){
            setErro(error.response.data);
        }
    };

    return (
        <>
        {erro && (
            <span className="mensagem-erro">
                {erro}
            </span>
        )}
        <form onSubmit={handleSubmit}>
            <h2>Editar Funcionário</h2>
            <input 
                type="text" 
                placeholder="Nome" 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} 
                required 
            />
            <input 
                type="text" 
                placeholder="Sobrenome" 
                value={sobrenome} 
                onChange={(e) => setSobrenome(e.target.value)} 
                required 
            />
            <select value={role} onChange={(e) => setRole(Number(e.target.value))} required>
                {rolesArray.map(([value, label]) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
            {telefones.map((telefone, index) => (
                <input 
                    key={index} 
                    type="text" 
                    placeholder="Telefone" 
                    value={telefone} 
                    onChange={(e) => handleTelefoneChange(index, e.target.value)} 
                />
            ))}
            <button type="button" onClick={handleAddTelefone}>Adicionar Telefone</button>
            <input 
                type="date" 
                placeholder="Data de Nascimento" 
                value={dataNascimento} 
                onChange={(e) => setDataNascimento(e.target.value)} 
                required 
            />
            <input 
                type="text" 
                placeholder="Número do Documento" 
                value={numeroDocumento} 
                onChange={(e) => setNumeroDocumento(e.target.value)} 
                required 
            />
            <select value={gestorId} onChange={(e) => setGestorId(e.target.value)} required>
                <option value="">Selecione o Gestor</option>
                {gestores.map((gestor) => (
                    <option key={gestor.id} value={gestor.id}>
                        {gestor.nome}
                    </option>
                ))}
            </select>
            <button type="submit">Salvar</button>
        </form>        
        </>
    );
};

export default EditarFuncionario;