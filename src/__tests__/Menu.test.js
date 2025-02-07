import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Menu from '../components/Menu';
import authService from '../services/authService';

// Mock do serviço de autenticação
jest.mock('../services/authService', () => ({
  logout: jest.fn(),
}));

describe('Menu', () => {
  it('deve renderizar o menu corretamente quando não está na página de login', () => {
    render(
      <MemoryRouter initialEntries={['/funcionarios']}>
        <Menu />
      </MemoryRouter>
    );

    // Verifica se o link para Home está presente
    expect(screen.getByText('Home')).toBeInTheDocument();

    // Verifica se o botão de logout está presente
    expect(screen.getByRole('button', { name: /Sair/i })).toBeInTheDocument();
  });

  it('deve chamar a função de logout e navegar para a página de login', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={['/funcionarios']}>
        <Menu />
      </MemoryRouter>
    );

    // Simula o clique no botão de logout
    fireEvent.click(getByRole('button', { name: /Sair/i }));

    // Verifica se a função de logout foi chamada
    expect(authService.logout).toHaveBeenCalled();
  });

  it('não deve renderizar o link Home e o botão Sair na página de login', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Menu />
      </MemoryRouter>
    );

    // Verifica que o link Home não está presente
    expect(screen.queryByText('Home')).not.toBeInTheDocument();

    // Verifica que o botão Sair não está presente
    expect(screen.queryByRole('button', { name: /Sair/i })).not.toBeInTheDocument();
  });
});