import mongoose from "mongoose";
const IngressoSchema = new mongoose.Schema({
  comprador_id: Number,
  id_assento: String,
  numero_sala: Number,
  nome_filme: String,
  data_inicio: Date,
  data_fim: Date,
  qr_code: String,
  valor_pago: Number,
  status: String,
  data_emissao: { type: Date, default: Date.now },
});

//cria ou recupera modelo de ingresso
const modelNome = "Ingresso";
const Ingresso =
  mongoose.models[modelNome] || mongoose.model(modelNome, IngressoSchema);

export default Ingresso;
