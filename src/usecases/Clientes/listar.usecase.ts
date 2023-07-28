import { ClientesRepository } from "../../repository/Clientes";

export type ClienteSemSenha = {
  id: string;
  nome_completo: string;
  cpf: string;
  email: string;
  telefone: string;
};

type RetornoListagem = {
  sucesso: boolean;
  mensagem: string;
  clientes: ClienteSemSenha[];
};

export class ListarClientes {
  public execute(): RetornoListagem {
    const repository = new ClientesRepository();
    const listaClientesRetorno = repository.listarClientes();

    if (!listaClientesRetorno.length) {
      return {
        sucesso: false,
        mensagem: "Não possui nenhum cliente cadastrado.",
        clientes: [],
      };
    }

    return {
      sucesso: true,
      mensagem: "Clientes listados com sucesso.",
      clientes: listaClientesRetorno,
    };
  }
}
