import notificationModel, { INotification } from "../models/notificationModel";

export const createNotification = async (data: {
  titulo: string;
  descricao: string;
  dataAudiencia: Date;
}): Promise<INotification> => {
  const notification = await notificationModel.create(data);
  return notification;
};

export const updateInfoNotification = async (
  id: string,
  data: {
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
  }
): Promise<INotification | null> => {
  return await notificationModel.findByIdAndUpdate(id, { ...data, status: "Validação" },{ new: true });
};
