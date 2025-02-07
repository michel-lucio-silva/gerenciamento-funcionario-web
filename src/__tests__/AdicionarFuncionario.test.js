import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdicionarFuncionario from '../components/AdicionarFuncionario';
import funcionarioService from '../services/funcionarioService';
import { act } from 'react'; 

jest.mock('../services/funcionarioService', () => ({
  getLideresEDiretores: jest.fn(),
}));

describe('AdicionarFuncionario', () => {
  beforeEach(() => {
    funcionarioService.getLideresEDiretores.mockResolvedValue([
      { id: 1, nome: 'Gestor 1' },
      { id: 2, nome: 'Gestor 2' },
    ]);
  });

  it('deve renderizar a tela de adicionar funcionário', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <AdicionarFuncionario />
        </MemoryRouter>
      );
    });

    expect(screen.getByText('Adicionar Funcionário')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Sobrenome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Data de Nascimento')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Número do Documento')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();

    expect(screen.getByText('Adicionar Telefone')).toBeInTheDocument();

  });
});