import { NextFunction, Request, Response } from "express";

export function validarParamentrosFiltragemProdutos(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const filtros = request.query;

  if (filtros.ordem_nome !== "cresc" && filtros.ordem_nome !== "decresc") {
    return response.status(400).json({
      status: false,
      mensagem:
        "Os valores dos filtros para ordenação do nome do produto é inválido.",
    });
  }

  if (filtros.ordem_preco !== "cresc" && filtros.ordem_preco !== "decresc") {
    return response.status(400).json({
      status: false,
      mensagem:
        "Os valores dos filtros para ordenação do preço do produto é inválido.",
    });
  }

  const valorMinParse = Number(filtros.valor_min);
  const valorMaxParse = Number(filtros.valor_max);

  if (isNaN(valorMinParse)) {
    return response.status(400).json({
      status: false,
      mensagem: "O valor do filtro de valor_min não é um dado numérico válido.",
    });
  }

  if (isNaN(valorMaxParse)) {
    return response.status(400).json({
      status: false,
      mensagem: "O valor do filtro de valor_max não é um dado numérico válido.",
    });
  }

  request.query.valor_min = valorMinParse.toString();
  request.query.valor_max = valorMaxParse.toString();

  next();
}
