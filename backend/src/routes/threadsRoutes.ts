import { Router } from "express";
import { Threads } from "../entities/Threads";
import { AppDataSource } from "../data-source";

const router = Router();

router.get("/threads", async (req, res) => {
  const threads = await AppDataSource.getRepository(Threads).find();

  res.status(200).json({ status: "success", data: threads });
});

router.post("/threads", async (req, res) => {
  const threads = AppDataSource.getRepository(Threads).create(req.body);
  const result = await AppDataSource.getRepository(Threads).save(threads);
  res.json(result);
});

export default router;
