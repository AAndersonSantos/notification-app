import type { INotification } from "../types/notification";

const BASE_URL = "http://localhost:3000/api";

// Listar todas as notificações
export const getNotifications = async (): Promise<INotification[]> => {
  const res = await fetch(`${BASE_URL}/notifications`);

  if (!res.ok) throw new Error("Erro ao buscar notificações");
  return res.json();
};

// Criar uma nova notificação
export const createNotification = async (data: {
  titulo: string;
  descricao: string;
  dataAudiencia: string;
}): Promise<INotification> => {
  const res = await fetch(`${BASE_URL}/notifications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao criar notificação");
  return res.json();
};

// Buscar uma notificação pelo ID
export const getNotificationById = async (id: string): Promise<INotification> => {
  const res = await fetch(`${BASE_URL}/notifications/${id}`);
  if (!res.ok) throw new Error("Erro ao buscar notificação");
  return res.json();
};

// Atualizar informações do notificado
export const updateInfoNotification = async (
  id: string,
  data: {
    titulo: string;
    descricao: string;
    dataAudiencia: string;
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
  }
): Promise<INotification> => {
  const res = await fetch(`${BASE_URL}/notifications/${id}/info`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao atualizar informações");
  return res.json();
};

// Validar notificação
export const validNotification = async (
  id: string,
  validateNotification: boolean
): Promise<INotification> => {
  const res = await fetch(`${BASE_URL}/notifications/${id}/validate`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ validateNotification }),
  });

  if (!res.ok) throw new Error("Erro ao validar notificação");
  return res.json();
};
