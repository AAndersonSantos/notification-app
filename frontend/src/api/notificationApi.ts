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