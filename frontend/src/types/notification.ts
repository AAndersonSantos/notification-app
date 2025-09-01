export interface INotification {
  _id: string;
  titulo: string;
  descricao: string;
  dataAudiencia: string;
  nome?: string;
  email?: string;
  telefone?: string;
  endereco?: string;
  status: "Em Andamento" | "Validação" | "Concluído";
  createdAt: string;
  updatedAt: string;
}

export interface UpdateNotificationModalProps {
  notification: INotification;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: () => void;
}

export interface ValidateNotificationsModalProps {
  notification: INotification;
  isOpen: boolean;
  onClose: () => void;
  onValidated: () => void;
}