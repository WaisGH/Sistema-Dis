import notificacaoValidator from "../validator/notificacaoValidator.js";
import { validationResult } from "express-validator";
import Notificacao from "../models/Notificacao.js";

//controlador de notificação
class NotificacaoController {
  //retorna todas as notificações
  async index(req, res) {
    try {
      const notificacoes = await Notificacao.find();
      res.json(notificacoes);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar notificações" });
    }
  }
  // busca notificação por id
  async show(req, res) {
    try {
      const notificacao = await Notificacao.findById(req.params.id);
      if (!notificacao) {
        return res.status(404).json({ error: "Notificação não encontrada" });
      }
      res.json(notificacao);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar notificação" });
    }
  }
  //cria nova notificação
  async store(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const notificacao = new Notificacao(req.body);
      await notificacao.save();
      res.status(201).json(notificacao);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar notificação" });
    }
  }
  // atualiza notificação por id
  async update(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const notificacao = await Notificacao.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true },
      );

      if (!notificacao) {
        return res.status(404).json({ error: "Notificação não encontrada" });
      }

      res.json(notificacao);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar notificação" });
    }
  }
  // deleta notificação por id
  async destroy(req, res) {
    try {
      const notificacao = await Notificacao.findByIdAndDelete(req.params.id);
      if (!notificacao) {
        return res.status(404).json({ error: "Notificação não encontrada" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar notificação" });
    }
  }
}

export default new NotificacaoController();
