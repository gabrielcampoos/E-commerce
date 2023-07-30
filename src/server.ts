import "dotenv/config";
import express from "express";
import { ClientesController, ProdutosController } from "./controllers";
import {
  validarAtualizacaoCamposCliente,
  validarCPF,
  validarCamposDeProduto,
  validarDadosUsuario,
  validarIdCliente,
  validarParamentrosFiltragemProdutos,
  validarTipoPreco,
} from "./middlewares";

const app = express();

// torna desnecessario a utilizacao do JSON.parse() e JSON.stringify()
app.use(express.json());

// converte os codigos unicode enviados na rota para o respectivo caracter
// Ex: %20 => ' '
app.use(express.urlencoded({ extended: false }));

app.listen(process.env.PORTA, () => {
  console.log(`Servidor rodando na porta ${process.env.PORTA}`);
});

// AS DEFINIÇÕES DAS ROTAS
app.get("/", (request, response) => {
  return response.json("API LOJA VIRTUAL NO AR 🚀");
});

// ===============================================
// CLIENTES
const controllerClientes = new ClientesController();
// POST - CADASTRAR CLIENTE
app.post(
  "/clientes",
  validarDadosUsuario,
  validarCPF,
  controllerClientes.cadastrar
);

// GET - LISTAR CLIENTES
app.get("/clientes", controllerClientes.listar);

// PUT - ATUALIZAR CLIENTES
app.put(
  "/clientes/:idCliente",
  validarIdCliente,
  validarAtualizacaoCamposCliente,
  controllerClientes.atualizar
);

// DELETE - EXCLUIR CLIENTES
app.delete(
  "/clientes/:idCliente",
  validarIdCliente,
  controllerClientes.deletar
);

// ===============================================
// ENDEREÇOS

// ===============================================
// PAGAMENTOS

// ===============================================
// PRODUTOS
const controllerProdutos = new ProdutosController();

// POST - CADASTRAR PRODUTO
app.post(
  "/produtos",
  validarCamposDeProduto,
  validarTipoPreco,
  controllerProdutos.criar
);

// GET - LISTAR PRODUTOS
app.get(
  "/produtos",
  validarParamentrosFiltragemProdutos,
  controllerProdutos.listar
);

// ===============================================
// CARRINHO
