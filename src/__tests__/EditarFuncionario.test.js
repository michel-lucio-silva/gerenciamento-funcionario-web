import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EditarFuncionario from '../components/EditarFuncionario';
import funcionarioService from '../services/funcionarioService';
import { act } from 'react';

jest.mock('../services/funcionarioService', () => ({
  getFuncionario: jest.fn(),
  getLideresEDiretores: jest.fn(),
}));

describe('EditarFuncionario', () => {
  beforeEach(() => {
    funcionarioService.getLideresEDiretores.mockResolvedValue([
      { id: 1, nome: 'Gestor 1' },
      { id: 2, nome: 'Gestor 2' },
    ]);

    funcionarioService.getFuncionario.mockResolvedValue({
      id: 1,
      nome: 'Funcionário 1',
      sobrenome: 'Sobrenome 1',
      role: 0,
      email: 'funcionario1@example.com',
      telefone: ['123456789'],
      dataNascimento: '1990-01-01',
      numeroDocumento: '123456789',
      gestorId: '1',
    });
  });

  it('deve renderizar a tela de editar funcionário', async () => {

    await act(async () => {
        render(
            <MemoryRouter initialEntries={['/funcionarios/editar/1']}>
            <EditarFuncionario />
          </MemoryRouter>
        );
      });

    expect(screen.getByText('Editar Funcionário')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Sobrenome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Data de Nascimento')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Número do Documento')).toBeInTheDocument();
    expect(screen.getByText('Adicionar Telefone')).toBeInTheDocument();
  });
});