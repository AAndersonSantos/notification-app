import { Router }  from "express";
import { createNotification, updateInfoNotification, validNotification } from "../controllers/notificationController";
const router = Router();

router.post("/notifications", createNotification);
router.put("/notifications/:id/info", updateInfoNotification);
router.put("/notifications/:id/validate", validNotification);

export default router;