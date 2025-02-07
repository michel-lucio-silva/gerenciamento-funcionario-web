import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../components/Login';
import authService from '../services/authService';

// Mock do serviço de autenticação
jest.mock('../services/authService', () => ({
  login: jest.fn(),
}));

describe('Login', () => {
  beforeAll(() => {
    // Mock para silenciar console.error durante os testes
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    // Restaura o console.error após os testes
    console.error.mockRestore();
  });

  it('deve renderizar a tela de login', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Verifica se o título está presente
    expect(screen.getByText('Login')).toBeInTheDocument();

    // Verifica se os campos de entrada estão presentes
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();

    // Verifica se o botão de login está presente
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
  });

  it('deve chamar a função de login e navegar para a página de funcionários', async () => {
    authService.login.mockResolvedValueOnce(); // Simula um login bem-sucedido

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Preenche os campos de email e senha
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password' } });

    // Simula o clique no botão de login
    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

    // Aguarda a chamada da função de login
    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password');
    });

    // Aqui você pode adicionar uma verificação se a navegação foi feita corretamente
    // Por exemplo, você pode verificar se a URL mudou ou se uma função de navegação foi chamada
  });

  it('deve exibir uma mensagem de erro ao falhar no login', async () => {
    authService.login.mockRejectedValueOnce(new Error('Erro ao fazer login')); // Simula um erro no login

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Preenche os campos de email e senha
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password' } });

    // Simula o clique no botão de login
    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

    // Aguarda a mensagem de erro ser exibida
    await waitFor(() => {
      expect(screen.getByText('Erro ao fazer login. Verifique suas credenciais.')).toBeInTheDocument();
    });
  });
});