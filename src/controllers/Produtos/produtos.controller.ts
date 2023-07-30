import { Request, Response } from "express";
import { AdicionarProduto, AdicionarProdutoDTO } from "../../usecases/Produtos";
import { ListarProdutos, Ordem } from "../../usecases/Produtos/listar.usecase";

export class ProdutosController {
  public criar(request: Request, response: Response) {
    const { nome, descricao, numeroSerie, preco }: AdicionarProdutoDTO =
      request.body;

    const usecase = new AdicionarProduto({
      nome,
      descricao,
      numeroSerie,
      preco,
    });

    const retorno = usecase.execute();

    if (!retorno.sucesso) {
      return response.status(400).send(retorno);
    }

    return response.status(201).send(retorno);
  }

  public listar(request: Request, response: Response) {
    const filtros = request.query;

    const usecase = new ListarProdutos({
      valor_max: Number(filtros.valor_max),
      valor_min: Number(filtros.valor_min),
      ordem_nome: filtros.ordem_nome as Ordem,
      ordem_preco: filtros.ordem_preco as Ordem,
      nome_produto: filtros.nome_produto?.toString(),
    });

    const retorno = usecase.execute();

    if (!retorno.sucesso) {
      return response.status(404).json(retorno);
    }
    return response.status(200).json(retorno);
  }
}
