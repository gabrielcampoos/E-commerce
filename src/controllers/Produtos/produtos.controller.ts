import { Request, Response } from "express";
import { AdicionarProduto, AdicionarProdutoDTO } from "../../usecases/Produtos";
import { ListarProdutos } from "../../usecases/Produtos/listar.usecase";

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
    const usecase = new ListarProdutos();
    const resposta = usecase.execute();

    if (!resposta.sucesso) {
      return response.status(404).json(resposta);
    }

    return response.status(200).json(resposta);
  }
}
