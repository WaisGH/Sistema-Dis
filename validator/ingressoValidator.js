//validação de dados de ingresso
import { checkSchema } from "express-validator";

export default {
  editAction: checkSchema({
    comprador_id: {
      notEmpty: { errorMessage: "ID do comprador é obrigatório" },
      trim: true,
      isInt: true,
    },
    assentos: {
      notEmpty: { errorMessage: "Array de assentos é obrigatório" },
      isArray: { errorMessage: "Assentos deve ser um array" },
    },
    numero_sala: {
      notEmpty: { errorMessage: "Número da sala é obrigatório" },
      trim: true,
      isInt: true,
    },
    nome_filme: {
      notEmpty: { errorMessage: "Nome do filme é obrigatório" },
      trim: true,
      isString: true,
    },
    data_inicio: {
      notEmpty: { errorMessage: "Data e hora de início são obrigatórias" },
      isISO8601: { errorMessage: "Data de início deve estar em formato ISO8601" },
    },
    data_fim: {
      notEmpty: { errorMessage: "Data e hora de fim são obrigatórias" },
      isISO8601: { errorMessage: "Data de fim deve estar em formato ISO8601" },
    },
    valor_pago: {
      notEmpty: { errorMessage: "Valor pago é obrigatório" },
      isFloat: { options: { min: 0 }, errorMessage: "Valor pago deve ser um número positivo" },
    },
    email: {
      notEmpty: { errorMessage: "Email é obrigatório" },
      isEmail: { errorMessage: "Email inválido" },
    },
  }),
};
