import { randomUUID } from "crypto";
import { Cliente } from "../../classes";
import { clientes } from "../../database";
import { CadastrarClienteDTO } from "../../usecases/Clientes";
import { AtualizarClienteDTO } from "../../usecases/Clientes/atualizar.usecase";
import { ClienteSemSenha } from "../../usecases/Clientes/listar.usecase";

export class ClientesRepository {
  public existeCPFCadastrado(cpf: string): boolean {
    return clientes.some((c) => c.toJSON().cpf === cpf);
  }

  public adicionarNovo(dados: CadastrarClienteDTO): Cliente {
    const novoCliente = new Cliente({
      id: randomUUID(),
      nome_completo: dados.nome,
      cpf: dados.cpf,
      email: dados.email,
      telefone: dados.telefone,
      senha: dados.senha,
    });

    clientes.push(novoCliente);

    return novoCliente;
  }

  public listarClientes(): ClienteSemSenha[] {
    return clientes.map((valor) => {
      const cliente = {
        ...valor.toJSON(),
        senha: undefined,
      };
      delete cliente.senha;
      return cliente;
    });
  }

  public buscarClientePorID(idCliente: string): number {
    return clientes.findIndex((cliente) => cliente.toJSON().id === idCliente);
  }

  public atualizarCliente(
    posicao: number,
    novosDados: Omit<AtualizarClienteDTO, "idCliente">
  ): ClienteSemSenha {
    clientes[posicao].atualizarDados(novosDados);

    return clientes[posicao].retornaClienteSemSenha();
  }

  public deletarCliente(posicao: number): Cliente {
    return clientes.splice(posicao, 1)[0];
  }
}
