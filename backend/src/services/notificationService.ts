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
    titulo: string;
    descricao: string;
    dataAudiencia: Date;
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
  validateNotification: boolean
): Promise<INotification | null> => {
  console.log("Validating notification with ID:", id, "Validation result:", validateNotification);
  const status = validateNotification ? "Concluído" : "Em Andamento";
  return await notificationModel.findByIdAndUpdate(id, { status }, { new: true })
};

export const getAllNotifications = async (): Promise<INotification[]> => {
  console.log("Fetching all notifications from the database");
  return await notificationModel.find();
}

export const getNotificationById = async (id: string): Promise<INotification | null> => {
  return await notificationModel.findById(id);
}