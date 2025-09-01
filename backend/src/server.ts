import express from "express";
import dotenv from "dotenv";
import router from "./routes/notificationRoutes";
import { connectDatabase } from "./config/database";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

const PORT = 3000;

connectDatabase().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server rodando na porta ${PORT}`));
});