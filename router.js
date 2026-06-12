import { Router } from "express";
import IngressoController from "./controllers/IngressoController.js";
import NotificacaoController from "./controllers/NotificacaoController.js";
import ingressoValidator from "./validator/ingressoValidator.js";
import notificacaoValidator from "./validator/notificacaoValidator.js";

const routes = new Router();
// Rotas para Ingressos
routes.post(
  "/ingressos",
  ingressoValidator.editAction,
  IngressoController.store,
);
routes.post("/ingressos", IngressoController.show);
routes.get("/ingressos/:id", IngressoController.index);
routes.delete("/ingressos/:id", IngressoController.destroy);

// Rotas para Notificações
routes.get("/notificacoes", NotificacaoController.index);
routes.get("/notificacoes/:id", NotificacaoController.show);

routes.post(
  "/notificacoes",
  notificacaoValidator.editAction,
  NotificacaoController.store,
);

export default routes;
