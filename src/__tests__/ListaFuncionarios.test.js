import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ListaFuncionarios from '../components/ListaFuncionarios';
import funcionarioService from '../services/funcionarioService';

jest.mock('../services/funcionarioService', () => ({
  getFuncionarios: jest.fn(),
  deleteFuncionario: jest.fn(),
  getFuncionario: jest.fn(),
}));

describe('ListaFuncionarios', () => {
  beforeEach(() => {
    funcionarioService.getFuncionarios.mockResolvedValue([
      {
        id: 1,
        nome: 'Funcionário 1',
        sobrenome: 'Sobrenome 1',
        telefone: ['123456789'],
        email: 'funcionario1@example.com',
        numeroDocumento: '123456789',
        nomeGestor: 'Gestor 1',
      },
      {
        id: 2,
        nome: 'Funcionário 2',
        sobrenome: 'Sobrenome 2',
        telefone: ['987654321'],
        email: 'funcionario2@example.com',
        numeroDocumento: '987654321',
        nomeGestor: 'Gestor 2',
      },
    ]);

    funcionarioService.getFuncionario.mockImplementation((nomeGestor) => {
      if (nomeGestor === 'Gestor 1') {
        return Promise.resolve({ nome: 'Gestor', sobrenome: 'Um' });
      } else if (nomeGestor === 'Gestor 2') {
        return Promise.resolve({ nome: 'Gestor', sobrenome: 'Dois' });
      }
      return Promise.resolve(null);
    });
  });

  it('deve renderizar a lista de funcionários', async () => {
    render(
      <MemoryRouter>
        <ListaFuncionarios />
      </MemoryRouter>
    );

    expect(screen.getByText('Lista de Funcionários')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Funcionário 1 Sobrenome 1')).toBeInTheDocument();
      expect(screen.getByText('Funcionário 2 Sobrenome 2')).toBeInTheDocument();
    });
  });
});