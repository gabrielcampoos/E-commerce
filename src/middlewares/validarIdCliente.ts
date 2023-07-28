import { NextFunction, Request, Response } from "express";

export function validarIdCliente(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { idCliente } = request.params;

  if (!idCliente) {
    return response.status(400).send({
      sucesso: false,
      mensagem: "É obrigatório informar o ID do cliente.",
      dados: null,
    });
  }
  next();
}
