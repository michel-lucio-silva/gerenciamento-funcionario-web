import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../components/Login';
import authService from '../services/authService';

jest.mock('../services/authService', () => ({
  login: jest.fn(),
}));

describe('Login', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  it('deve renderizar a tela de login', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
  });

  it('deve chamar a função de login e navegar para a página de funcionários', async () => {
    authService.login.mockResolvedValueOnce();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password' } });

    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password');
    });

  });

  it('deve exibir uma mensagem de erro ao falhar no login', async () => {
    authService.login.mockRejectedValueOnce(new Error('Erro ao fazer login')); 

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password' } });

    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

    await waitFor(() => {
      expect(screen.getByText('Erro ao fazer login. Verifique suas credenciais.')).toBeInTheDocument();
    });
  });
});