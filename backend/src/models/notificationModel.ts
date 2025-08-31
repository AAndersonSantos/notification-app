import { Schema, model, Document } from "mongoose";

export interface INotification extends Document {
  titulo: string;
  descricao: string;
  dataAudiencia: Date;
  nome?: string;
  email?: string;
  telefone?: string;
  endereco?: string;
  status: "Em Andamento" | "Validação" | "Concluído";
}

const NotificationSchema = new Schema<INotification>(
  {
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    dataAudiencia: { type: Date, required: true },
    nome: { type: String },
    email: { type: String },
    telefone: { type: String },
    endereco: { type: String },
    status: {
      type: String,
      enum: ["Em Andamento", "Validação", "Concluído"],
      default: "Em Andamento",
    },
  },
  { timestamps: true }
);

export default model<INotification>("Notification", NotificationSchema);
