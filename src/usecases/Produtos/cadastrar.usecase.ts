import { Produto, ProdutoDTO } from "../../classes";
import { ProdutosRepository } from "../../repository/Produtos";

export type AdicionarProdutoDTO = Omit<ProdutoDTO, "id">;

export type RetornoAdicionarProduto = {
  sucesso: boolean;
  mensagem: string;
  produtoCadastrado?: Produto;
};

export class AdicionarProduto {
  dados: AdicionarProdutoDTO;

  constructor(dados: AdicionarProdutoDTO) {
    this.dados = dados;
  }

  execute(): RetornoAdicionarProduto {
    const repository = new ProdutosRepository();

    if (repository.verificarNumeroDeSerie(this.dados.numeroSerie)) {
      return {
        sucesso: false,
        mensagem: "O produto já possui número de série cadastrado.",
      };
    }

    if (this.dados.preco <= 0) {
      return {
        sucesso: false,
        mensagem: "O preço precisa ter um valor positivo e diferente de zero.",
      };
    }

    const novoProduto = repository.cadastrarProduto(this.dados);

    return {
      sucesso: true,
      mensagem: "Novo produto adicionado com sucesso.",
      produtoCadastrado: novoProduto,
    };
  }
}
