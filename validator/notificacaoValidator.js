//validação de dados de ingressos
import { checkSchema } from "express-validator";

export default {
  editAction: checkSchema({
    log_id: {
      notEmpty: { errorMessage: "Log ID é obrigatório" },
      trim: true,
      isInt: true,
    },
    id: {
      notEmpty: { errorMessage: "ID é obrigatório" },
      trim: true,
      isInt: true,
    },
    email: {
      notEmpty: { errorMessage: "Email é obrigatório" },
      isEmail: {
        errorMessage: "Insira um email válido",
      },
      trim: true,
    },
    horario: {
      notEmpty: { errorMessage: "Horário é obrigatório" },
      trim: true,
      isString: true,
    },
    status: {
      optional: true,
      trim: true,
      isString: true,
    },
  }),
};
