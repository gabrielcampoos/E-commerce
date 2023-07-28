import { Request, Response } from "express";
import { CadastrarCliente } from "../../usecases/Clientes";
import { AtualizarCliente } from "../../usecases/Clientes/atualizar.usecase";
import { DeletarCliente } from "../../usecases/Clientes/deletar.usecase";
import { ListarClientes } from "../../usecases/Clientes/listar.usecase";

export class ClientesController {
  // CREATE
  public cadastrar(request: Request, response: Response) {
    const { nome_completo, cpf, telefone, email, senha } = request.body;

    // precisa passar para a camada de regra de negocio
    const usecase = new CadastrarCliente({
      nome: nome_completo,
      telefone: telefone,
      cpf: cpf,
      email: email,
      senha: senha,
    });

    const resposta = usecase.execute();

    if (!resposta.sucesso) {
      return response.status(400).json(resposta);
    }

    return response.status(201).json(resposta);
  }

  // LIST ALL
  public listar(request: Request, response: Response) {
    const usecase = new ListarClientes();
    const resposta = usecase.execute();

    if (!resposta.sucesso) {
      return response.status(404).send({ resposta });
    }

    return response.status(200).send({ resposta });
  }

  // LIST BY ID

  // UPDATE
  public atualizar(request: Request, response: Response) {
    const { idCliente } = request.params;
    const { nome_completo, telefone, email } = request.body;
    const usecase = new AtualizarCliente({
      idCliente,
      nome: nome_completo,
      email,
      telefone,
    });

    const retorno = usecase.execute();

    if (!retorno.sucesso) {
      return response.status(404).send({ retorno });
    }

    return response.status(200).send({ retorno });
  }

  // DELETE
  public deletar(request: Request, response: Response) {
    const { idCliente } = request.params;

    const usecase = new DeletarCliente(idCliente);

    const retorno = usecase.execute();

    if (!retorno.sucesso) {
      return response.status(404).send({ retorno });
    }

    return response.status(200).send({ retorno });
  }
}
