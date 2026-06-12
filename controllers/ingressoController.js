import Ingresso from "../models/Ingresso.js";
import Notificacao from "../models/Notificacao.js";
import { validationResult } from "express-validator";

// controlador de ingressos
class IngressoController {
  async show(req, res) {
    try {
      const ingressos = await Ingresso.find();
      res.json(ingressos);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar ingressos" });
    }
  }

  // cria múltiplos ingressos (um para cada assento) e notificação associada
  async store(req, res) {
    console.log("Iniciando criação de ingressos");

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { 
        comprador_id, 
        email, 
        assentos, // Array de IDs de assento
        numero_sala,
        nome_filme,
        data_inicio,
        data_fim,
        valor_pago
      } = req.body;

      // Valida se há assentos
      if (!assentos || !Array.isArray(assentos) || assentos.length === 0) {
        return res.status(400).json({ error: "Pelo menos um assento é obrigatório" });
      }

      // Cria um ingresso para cada assento
      const ingressosCriados = [];
      
      for (const id_assento of assentos) {
        const qrCodeLink = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Assento:${id_assento}-Sala:${numero_sala}-Filme:${nome_filme}-Cliente:${comprador_id}`;

        const novoIngresso = new Ingresso({
          comprador_id,
          id_assento,
          numero_sala,
          nome_filme,
          data_inicio,
          data_fim,
          qr_code: qrCodeLink,
          valor_pago,
          status: "CONCLUIDO",
        });
        
        await novoIngresso.save();
        ingressosCriados.push(novoIngresso);
      }

      // Cria notificação de sucesso
      const novaNotificacao = new Notificacao({
        log_id: comprador_id,
        id: Math.floor(Math.random() * 1000),
        email: email,
        horario: new Date().toLocaleString("pt-BR"),
        status: `SUCESSO: ${ingressosCriados.length} ingresso(s) emitido(s) e enviado(s) por e-mail`,
      });
      await novaNotificacao.save();

      res.status(201).json({
        message: `${ingressosCriados.length} ingresso(s) criado(s) com sucesso pelo Grupo D!`,
        ingressos: ingressosCriados,
        log: novaNotificacao,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Erro interno ao processar ingresso(s)/notificação" });
    }
  }

  //busca ingresso por id
  async index(req, res) {
    try {
      const ingresso = await Ingresso.findOne({ id: req.params.id });
      if (!ingresso)
        return res.status(404).json({ error: "Ingresso não encontrado" });
      res.json(ingresso);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar ingresso" });
    }
  }

  //deleta ingresso por id
  async destroy(req, res) {
    try {
      const ingresso = await Ingresso.findOneAndDelete({ id: req.params.id });
      if (!ingresso)
        return res.status(404).json({ error: "Ingresso não encontrado" });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar ingresso" });
    }
  }
}

export default new IngressoController();
