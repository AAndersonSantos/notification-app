import notificationModel, { INotification } from "../models/notificationModel";

export const createNotification = async (data: {
  titulo: string;
  descricao: string;
  dataAudiencia: Date;
}): Promise<INotification> => {
  return await notificationModel.create(data);
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

export const validNotification = async (
  id: string,
  requiresAdditionalInformation: boolean
): Promise<INotification | null> => {
  const status = requiresAdditionalInformation ? "Validação" : "Concluído";
  return await notificationModel.findByIdAndUpdate(id, { status }, { new: true })
};

export const getAllNotifications = async (): Promise<INotification[]> => {
  console.log("Fetching all notifications from the database");
  return await notificationModel.find();
}