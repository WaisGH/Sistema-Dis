import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./router.js";

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.database();
    this.routes();
  }
  //configura middlewares de cors, json e rotas
  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(routes);
  }
  database() {
    mongoose
      .connect("mongodb://127.0.0.1:27017/cinema_db")
      .then(() =>
        console.log("[Banco de Dados] MongoDB conectado com sucesso!"),
      )
      .catch((err) =>
        console.error("Erro ao conectar ao MongoDB:", err.message),
      );
  }
  routes() {
    this.server.use(routes);
  }
}
// instancia a aplicação e define porta
const appInstance = new App();
const server = appInstance.server;
const PORT = 3001;

server.listen(PORT, () => {
  console.log("--------------------------------------------------");
  console.log(`Grupo D: API rodando em http://localhost:${PORT}`);
  console.log("--------------------------------------------------");
});
