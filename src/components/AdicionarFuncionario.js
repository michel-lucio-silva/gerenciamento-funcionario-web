import React, { useState, useEffect } from 'react';
import funcionarioService from '../services/funcionarioService';
import { useNavigate } from 'react-router-dom';
import '../css/AdicionarFuncionario.css'; 

const rolesMap = {
    0: 'Funcionário',
    1: 'Líder',
    2: 'Diretor',
};

const rolesArray = Object.entries(rolesMap);

const AdicionarFuncionario = () => {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [role, setRole] = useState(0);
    const [email, setEmail] = useState('');
    const [telefones, setTelefones] = useState(['']);
    const [dataNascimento, setDataNascimento] = useState('');
    const [numeroDocumento, setNumeroDocumento] = useState('');
    const [gestorId, setGestorId] = useState('');
    const [senha, setSenha] = useState('');
    const [gestores, setGestores] = useState([]);
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGestores = async () => {
            const data = await funcionarioService.getLideresEDiretores();
            setGestores(data);
        };
        fetchGestores();
    }, []);

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
        
        const validTelefones = telefones.filter(telefone => telefone.trim() !== '');
        if (validTelefones.length === 0) {
            setErro('Por favor, preencha pelo menos um número de telefone.');
            return;
        }
    
        if (senha.trim() === '') {
            setErro('Por favor, preencha a senha.');
            return;
        }
    
        try {
            await funcionarioService.addFuncionario({
                nome,
                sobrenome,
                role,
                email,
                telefone: validTelefones,
                dataNascimento,
                numeroDocumento,
                gestorId,
                senha,
            });
            navigate('/funcionarios');
        } catch (error) {
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
                <h2>Adicionar Funcionário</h2>
                <input 
                    type="text" 
                    placeholder="Nome" 
                    aria-label="Nome" 
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
                <select value={gestorId} onChange={(e) => setGestorId(e.target.value)} >
                    <option value="">Selecione o Gestor</option>
                    {gestores.map((gestor) => (
                        <option key={gestor.id} value={gestor.id}>
                            {gestor.nome}
                        </option>
                    ))}
                </select>
                <input 
                    type="password"
                    placeholder="Senha" 
                    value={senha} 
                    onChange={(e) => setSenha(e.target.value)} 
                    required 
                />
                <button type="submit">Adicionar</button>
            </form>   
        </>
    );
};

export default AdicionarFuncionario;