import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/teste", async ( req: Request, res: Response )  => {
    res.send("Hello world");
})

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});