import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import authService from '../src/services/authService';
import funcionarioService from '../src/services/funcionarioService';

// Mock dos componentes
jest.mock('./components/Menu', () => () => <div>Menu</div>);
jest.mock('./components/ListaFuncionarios', () => () => (
  <div>
    <h2>Lista de Funcionários</h2>
    <table>
      <tbody>
        <tr>
          <td>Funcionário 1</td>
          <td>123456789</td>
          <td>funcionario1@example.com</td>
          <td>123456789</td>
          <td>Gestor 1</td>
          <td>
            <button>Edit</button>
            <button>Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
));
jest.mock('./components/AdicionarFuncionario', () => () => <div>AdicionarFuncionario</div>);
jest.mock('./components/EditarFuncionario', () => () => <div>EditarFuncionario</div>); // Mock do EditarFuncionario

// Mock do serviço de autenticação
jest.mock('../src/services/authService', () => ({
  login: jest.fn(() => Promise.resolve()), // Simula um login bem-sucedido
  isAuthenticated: jest.fn(() => true), // Simula que o usuário está autenticado
}));

// Mock do serviço de funcionários
jest.mock('../src/services/funcionarioService', () => ({
  getFuncionarios: jest.fn(() => Promise.resolve([{ 
    id: 1, 
    nome: 'Funcionário 1', 
    sobrenome: 'Sobrenome 1', 
    telefone: ['123456789'], 
    email: 'funcionario1@example.com', 
    numeroDocumento: '123456789', 
    nomeGestor: 1 
  }])), // Simula a obtenção de funcionários
}));

describe('App', () => {
  it('renderiza sem erros e exibe os componentes corretos', async () => {
    // Simula o login
    await authService.login('test@example.com', 'password');

    render(<App />); // Renderiza o App diretamente

    // Verifica se o Menu está sendo renderizado
    expect(screen.getByText('Menu')).toBeInTheDocument();

  });
});