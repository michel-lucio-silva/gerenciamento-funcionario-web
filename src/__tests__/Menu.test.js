import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Menu from '../components/Menu';
import authService from '../services/authService';

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

    expect(screen.getByText('Home')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Sair/i })).toBeInTheDocument();
  });

  it('deve chamar a função de logout e navegar para a página de login', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={['/funcionarios']}>
        <Menu />
      </MemoryRouter>
    );

    fireEvent.click(getByRole('button', { name: /Sair/i }));

    expect(authService.logout).toHaveBeenCalled();
  });

  it('não deve renderizar o link Home e o botão Sair na página de login', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Menu />
      </MemoryRouter>
    );

    expect(screen.queryByText('Home')).not.toBeInTheDocument();

    expect(screen.queryByRole('button', { name: /Sair/i })).not.toBeInTheDocument();
  });
});