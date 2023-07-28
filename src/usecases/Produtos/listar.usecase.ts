import { ProdutosRepository } from "../../repository/Produtos";

export type ListagemProdutos = {
  id: string;
  categorias: any[];
  preco: number;
  quantidadeEstoque?: number;
  nome: string;
  descricao: string;
  numeroSerie: string;
  ativo: boolean;
};

type RetornoListagem = {
  sucesso: boolean;
  mensagem: string;
  produtos: ListagemProdutos[];
};

export class ListarProdutos {
  public execute(): RetornoListagem {
    const repository = new ProdutosRepository();
    const listaProdutosRetorno = repository.listarProdutos();

    if (!listaProdutosRetorno.length) {
      return {
        sucesso: false,
        mensagem: "Não possui nenhum produto cadastrado.",
        produtos: [],
      };
    }

    return {
      sucesso: true,
      mensagem: "Produtos listados com sucesso.",
      produtos: listaProdutosRetorno,
    };
  }
}
