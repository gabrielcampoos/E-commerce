import { NextFunction, Request, Response } from "express";

export function validarTipoPreco(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { preco } = request.body;

  if (typeof preco === "string") {
    request.body.preco = Number(preco.replaceAll(".", "").replaceAll(",", "."));
  }

  if (isNaN(request.body.preco)) {
    return response.status(400).json({
      mensagem: "O dado informado para preço deve ser um número válido.",
      sucesso: false,
    });
  }

  if (typeof request.body.preco !== "number") {
    return response.status(400).json({
      mensagem: "O dado informado para preço deve ser um número válido.",
      sucesso: false,
    });
  }

  next();
}
