import { Request, Response } from "express";
import * as notificationService from "../services/notificationService";

export const createNotification = async (req: Request, res: Response) => {
    try{
        const notification = await notificationService.createNotification(req.body);
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar notificação", error });
    }

}

export const updateInfoNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const notification = await notificationService.updateInfoNotification(id, req.body);
    if (!notification) {
      return res.status(404).json({ error: "Notificação não encontrada" });
    }
    res.json(notification);

  } catch (error) {
    res.status(500).json({ error: "Erro ao complementar notificação" });
  }

};

export const validNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { requiresAdditionalInformation } = req.body;
    
    const notification = await notificationService.validNotification(id, requiresAdditionalInformation);
    if (!notification) {
      return res.status(404).json({ error: "Notificação não encontrada" });
    }
    res.json(notification);

  } catch (error) {
    res.status(500).json({ error: "Erro ao validar notificação" });
  }
};

export const getAllNotifications = async (req: Request, res: Response) => {
  try {
    console.log("Fetching all notifications from the database");
    const notifications = await notificationService.getAllNotifications();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar notificações", error });
  }
};