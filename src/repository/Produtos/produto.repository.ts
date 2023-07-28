import { randomUUID } from "crypto";
import { Produto } from "../../classes";
import { produtos } from "../../database";
import { AdicionarProdutoDTO } from "../../usecases/Produtos";
import { ListagemProdutos } from "../../usecases/Produtos/listar.usecase";

export class ProdutosRepository {
  verificarNumeroDeSerie(numeroSerie: string) {
    return produtos.some((p) => p.toJSON().numeroSerie === numeroSerie);
  }

  cadastrarProduto(produto: AdicionarProdutoDTO): Produto {
    const { preco, nome, descricao, numeroSerie } = produto;
    const novoProduto = new Produto({
      id: randomUUID(),
      descricao,
      preco,
      nome,
      numeroSerie,
    });

    produtos.push(novoProduto);

    return novoProduto;
  }

  public listarProdutos(): ListagemProdutos[] {
    return produtos.map((valor) => {
      const produto = {
        ...valor.toJSON(),
      };
      return produto;
    });
  }
}
