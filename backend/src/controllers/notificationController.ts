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