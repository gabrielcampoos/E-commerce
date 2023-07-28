import { NextFunction, Request, Response } from "express";

export function validarCamposDeProduto(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { nome, preco, descricao, numeroSerie } = request.body;

  if (!nome || !preco || !descricao || !numeroSerie) {
    return response.status(400).send({
      sucesso: false,
      mensagem:
        "É preciso informar todas as propriedades para a criação do Produto",
      dados: null,
    });
  }
  next();
}
