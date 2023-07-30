import { randomUUID } from "crypto";
import { Produto } from "../../classes";
import { produtos } from "../../database";
import { AdicionarProdutoDTO } from "../../usecases/Produtos";
import { FiltrosDTO } from "../../usecases/Produtos/listar.usecase";

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

  public listagemProdutos(filtros: FiltrosDTO) {
    const { ordem_nome, nome_produto, ordem_preco, valor_max, valor_min } =
      filtros;

    let listaCopia = [...produtos];

    if (valor_max) {
      listaCopia = listaCopia.filter(
        (produto) => produto.toJSON().preco <= valor_max
      );
    }

    if (valor_min) {
      listaCopia = listaCopia.filter(
        (produto) => produto.toJSON().preco <= valor_min
      );
    }

    if (ordem_nome) {
      if (ordem_nome === "cresc") {
        listaCopia = listaCopia.sort((a, b) => {
          if (a.toJSON().nome > b.toJSON().nome) {
            return 1;
          }

          if (a.toJSON().nome < b.toJSON().nome) {
            return -1;
          }

          return 0;
        });
      } else {
        listaCopia = listaCopia.sort((a, b) => {
          if (a.toJSON().nome < b.toJSON().nome) {
            return 1;
          }

          if (a.toJSON().nome > b.toJSON().nome) {
            return -1;
          }

          return 0;
        });
      }
    }

    if (ordem_preco) {
      if (ordem_preco === "cresc") {
        listaCopia = listaCopia.sort((a, b) => {
          if (a.toJSON().preco > b.toJSON().preco) {
            return 1;
          }

          if (a.toJSON().preco < b.toJSON().preco) {
            return -1;
          }

          return 0;
        });
      } else if (ordem_preco) {
        listaCopia = listaCopia.sort((a, b) => {
          if (a.toJSON().preco < b.toJSON().preco) {
            return 1;
          }

          if (a.toJSON().preco > b.toJSON().preco) {
            return -1;
          }

          return 0;
        });
      }
    }

    if (nome_produto) {
      listaCopia = listaCopia.filter((produto) =>
        produto.toJSON().nome.startsWith(nome_produto)
      );
    }

    return listaCopia;
  }
}
