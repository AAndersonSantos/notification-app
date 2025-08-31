import { Router }  from "express";
import { createNotification, updateInfoNotification } from "../controllers/notificationController";
const router = Router();

router.post("/notifications", createNotification);
router.put("/notifications/:id/info", updateInfoNotification);

export default router;