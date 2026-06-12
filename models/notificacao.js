import mongoose from "mongoose";
const modelSchema = new mongoose.Schema({
  log_id: Number,
  id: Number,
  email: String,
  horario: String,
  status: String,
});

//cria ou recupera modelo de notificação
const modelNome = "Notificacao";
const Notificacao =
  mongoose.models[modelNome] || mongoose.model(modelNome, modelSchema);

export default Notificacao;
